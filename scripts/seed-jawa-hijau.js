// Script to seed the Jawa Hijau theme and create a preview tenant
// Usage: SUPABASE_SERVICE_ROLE_KEY=xxx NEXT_PUBLIC_SUPABASE_URL=xxx node scripts/seed-jawa-hijau.js
// Note: Run supabase/migrations/009_jawa_hijau_theme.sql via Supabase SQL Editor first

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hckwfnzbrylornkcgcux.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY. Provide it as env var.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const themeId = "00000000-0000-0000-0000-000000000009";
  const slug = "jawa-hijau-preview";
  const themeConfig = {
    primaryColor: "#1B5E20",
    secondaryColor: "#F5F0E8",
    accentColor: "#D4A843",
    backgroundColor: "#FFFAF5",
    textColor: "#1A1A1A",
    fontHeading: "Cormorant Garamond",
    fontBody: "Lato",
    fontScript: "Great Vibes",
    ornamentStyle: "jawa-hijau",
  };

  // 1. Insert or update the Jawa Hijau theme
  const { data: theme, error: themeError } = await supabase
    .from("themes")
    .upsert(
      {
        id: themeId,
        name: "Jawa Hijau",
        thumbnail_url: "/images/themes/jawa-hijau-thumb.jpg",
        config: themeConfig,
        is_premium: true,
        is_active: true,
      },
      { onConflict: "id" }
    )
    .select()
    .single();

  if (themeError) {
    console.error("Error inserting theme:", themeError);
    process.exit(1);
  }
  console.log("Theme inserted: Jawa Hijau");

  // 2. Check if preview tenant already exists
  const { data: existing } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existing) {
    console.log("Preview tenant already exists with slug:", slug);
    console.log("URL: https://undangan-digital-rosy.vercel.app/" + slug);
    console.log("Done!");
    return;
  }

  // 3. Create a preview tenant (without Instagram fields - run migration first)
  const previewDate = "2026-10-20";
  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .insert({
      slug: slug,
      groom_name: "Aditya Nugraha",
      bride_name: "Zahra Azzahra",
      groom_nickname: "Adit",
      bride_nickname: "Zahra",
      groom_father: "Bapak Pratama",
      groom_mother: "Ibu Lestari",
      bride_father: "Bapak Abdullah",
      bride_mother: "Ibu Fatimah",
      religion: "islam",
      akad_date: previewDate,
      akad_time_start: "08:00",
      akad_time_end: "10:00",
      akad_venue_name: "Masjid Agung Jawa Tengah",
      akad_venue_address: "Jl. Gajah Raya, Semarang",
      akad_maps_url: "https://maps.app.goo.gl/example",
      reception_date: previewDate,
      reception_time_start: "11:00",
      reception_time_end: "16:00",
      reception_venue_name: "Masjid Agung Jawa Tengah",
      reception_venue_address: "Jl. Gajah Raya, Semarang",
      reception_maps_url: "https://maps.app.goo.gl/example",
      time_zone: "WIB",
      theme_id: themeId,
      love_story:
        "Berawal dari sebuah acara kajian di masjid kampus, kami dipertemukan oleh Allah. Adit yang aktif di divisi dakwah dan Zahra yang mengurus acara wanita, kerap bekerja sama. Dari situlah tumbuh rasa saling menghargai, yang akhirnya kami niatkan untuk melanjutkan ke jenjang pernikahan yang berkah.",
      dresscode: "Busana Muslim / Batik",
      closing_message:
        "Merupakan suatu kebahagiaan dan kehormatan apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu pada acara pernikahan kami.",
      is_active: true,
      show_amplop_digital: true,
      show_gift_address: true,
      gift_address: "Jl. Merbabu No. 33, Semarang",
      gift_notes: "Hadiah dalam bentuk amplop atau kado, silakan kirim ke alamat di atas.",
      bank_accounts: [
        { id: "1", bankName: "Bank Syariah Indonesia", accountNumber: "1234567890", accountHolder: "Zahra Azzahra", isActive: true },
        { id: "2", bankName: "BCA", accountNumber: "0987654321", accountHolder: "Aditya Nugraha", isActive: true },
      ],
      lottie_auto_select: true,
      lottie_animation_position: "both",
    })
    .select()
    .single();

  if (tenantError) {
    console.error("Error inserting tenant:", tenantError);
    process.exit(1);
  }

  console.log("Preview tenant created:", tenant.slug);
  console.log("URL: https://undangan-digital-rosy.vercel.app/" + slug);
  console.log("Done!");
}

seed().catch(console.error);
