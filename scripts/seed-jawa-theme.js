// Script to seed the Jawa theme and create a preview tenant
// Usage: SUPABASE_SERVICE_ROLE_KEY=xxx NEXT_PUBLIC_SUPABASE_URL=xxx node scripts/seed-jawa-theme.js

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hckwfnzbrylornkcgcux.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY. Provide it as env var.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const themeId = "00000000-0000-0000-0000-000000000007";
  const slug = "jawa-preview";
  const themeConfig = {
    primaryColor: "#5C3A21",
    secondaryColor: "#F5E6D3",
    accentColor: "#C9A96E",
    backgroundColor: "#FDF5EC",
    textColor: "#1A1A1A",
    fontHeading: "Cormorant Garamond",
    fontBody: "Lato",
    fontScript: "Great Vibes",
    ornamentStyle: "jawa",
  };

  // 1. Insert or update the Jawa theme
  const { data: theme, error: themeError } = await supabase
    .from("themes")
    .upsert(
      {
        id: themeId,
        name: "Jawa",
        thumbnail_url: "/images/themes/jawa-thumb.jpg",
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
  console.log("Theme inserted:", theme.name);

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

  // 3. Create a preview tenant
  const previewDate = "2026-08-15";
  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .insert({
      slug: slug,
      groom_name: "Raden Wisnu",
      bride_name: "Dewi Sekar",
      groom_nickname: "Wisnu",
      bride_nickname: "Sekar",
      groom_father: "Bapak Sutopo",
      groom_mother: "Ibu Sari",
      bride_father: "Bapak Wibowo",
      bride_mother: "Ibu Ratna",
      religion: "islam",
      akad_date: previewDate,
      akad_time_start: "08:00",
      akad_time_end: "10:00",
      akad_venue_name: "Pendopo Agung Taman Sari",
      akad_venue_address: "Jl. Siliwangi No. 123, Yogyakarta",
      akad_maps_url: "https://maps.app.goo.gl/example",
      reception_date: previewDate,
      reception_time_start: "11:00",
      reception_time_end: "16:00",
      reception_venue_name: "Pendopo Agung Taman Sari",
      reception_venue_address: "Jl. Siliwangi No. 123, Yogyakarta",
      reception_maps_url: "https://maps.app.goo.gl/example",
      time_zone: "WIB",
      theme_id: themeId,
      love_story: "Pertemuan pertama kami di sebuah pagelaran wayang kulit menjadi awal dari kisah cinta ini. Seperti tokoh-tokoh dalam pewayangan, kami meyakini bahwa setiap pertemuan sudah digariskan oleh Sang Maha Kuasa. Kini, dengan restu kedua orang tua, kami memantapkan hati untuk bersatu dalam ikatan pernikahan.",
      dresscode: "Busana Adat Jawa / Batik",
      closing_message: "Merupakan suatu kebahagiaan dan kehormatan yang tak terhingga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu pada acara pernikahan kami.",
      is_active: true,
      show_amplop_digital: true,
      show_gift_address: true,
      gift_address: "Jl. Pangeran Diponegoro No. 45, Yogyakarta",
      gift_notes: "Hadiah dalam bentuk amplop atau kado, silakan kirim ke alamat di atas.",
      bank_accounts: [
        { id: "1", bankName: "Bank Mandiri", accountNumber: "1234567890", accountHolder: "Dewi Sekar", isActive: true },
        { id: "2", bankName: "BCA", accountNumber: "0987654321", accountHolder: "Raden Wisnu", isActive: true },
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
