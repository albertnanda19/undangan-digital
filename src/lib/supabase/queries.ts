import { createClient, createAdminClient } from "@/lib/supabase/server";
import type {
  Tenant,
  Guest,
  RSVPResponse,
  Wish,
  Photo,
  Theme,
  DashboardStats,
  ClientStats,
} from "@/types";

// ============================================================
// TENANTS (menggunakan admin client untuk bypass RLS)
// ============================================================

export async function getAllTenants() {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("tenants")
    .select(`*, theme:themes(*)`)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getTenantById(id: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("tenants")
    .select(`*, theme:themes(*), photos(*)`)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function getTenantBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tenants")
    .select(`*, theme:themes(*)`)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  if (error) return null;
  return data;
}

export async function createTenant(tenantData: Partial<Tenant>) {
  const supabase = await createAdminClient();
  const snaked = toSnakeCase(tenantData);
  // Remove null/undefined values so DB defaults apply
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(snaked)) {
    if (value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  }
  const { data, error } = await supabase
    .from("tenants")
    .insert(cleaned)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTenant(id: string, tenantData: Partial<Tenant>) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("tenants")
    .update(toSnakeCase(tenantData))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTenant(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("tenants")
    .update({ is_active: false })
    .eq("id", id);
  if (error) throw error;
}

// ============================================================
// PHOTOS
// ============================================================

export async function getPhotosByTenant(tenantId: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as Photo[];
}

export async function createPhoto(photo: {
  tenantId: string;
  url: string;
  caption?: string;
  sortOrder: number;
}) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("photos")
    .insert({
      tenant_id: photo.tenantId,
      url: photo.url,
      caption: photo.caption,
      sort_order: photo.sortOrder,
    })
    .select()
    .single();
  if (error) throw error;
  return data as Photo;
}

export async function deletePhoto(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("photos").delete().eq("id", id);
  if (error) throw error;
}

// ============================================================
// GUESTS
// ============================================================

export async function getGuestsByTenant(tenantId: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("name", { ascending: true });
  if (error) throw error;
  return data as Guest[];
}

export async function createGuest(guest: Omit<Guest, "id" | "createdAt">) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .insert({
      tenant_id: guest.tenantId,
      name: guest.name,
      phone: guest.phone,
      invitation_code: guest.invitationCode,
      category: guest.category,
      is_vip: guest.isVip,
      seat_number: guest.seatNumber,
      notes: guest.notes,
    })
    .select()
    .single();
  if (error) throw error;
  return data as Guest;
}

export async function bulkCreateGuests(
  guests: Omit<Guest, "id" | "createdAt">[]
) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .insert(
      guests.map((g) => ({
        tenant_id: g.tenantId,
        name: g.name,
        phone: g.phone,
        invitation_code: g.invitationCode,
        category: g.category,
        is_vip: g.isVip,
        seat_number: g.seatNumber,
        notes: g.notes,
      }))
    )
    .select();
  if (error) throw error;
  return data as Guest[];
}

export async function getGuestByCode(code: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("invitation_code", code.toUpperCase())
    .single();
  if (error) return null;
  return data as Guest;
}

// ============================================================
// RSVP
// ============================================================

export async function getRSVPByTenant(tenantId: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("rsvp_responses")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return data as RSVPResponse[];
}

export async function createRSVP(rsvp: {
  tenantId: string;
  guestId?: string;
  name: string;
  phone?: string;
  attendance: string;
  guestCount: number;
  eventType: string;
  message?: string;
}) {
  const supabase = await createAdminClient();

  if (rsvp.phone) {
    const { data: existing } = await supabase
      .from("rsvp_responses")
      .select("id")
      .eq("tenant_id", rsvp.tenantId)
      .eq("phone", rsvp.phone)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from("rsvp_responses")
        .update({
          name: rsvp.name,
          attendance: rsvp.attendance,
          guest_count: rsvp.guestCount,
          event_type: rsvp.eventType,
          message: rsvp.message,
          submitted_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  }

  const { data, error } = await supabase
    .from("rsvp_responses")
    .insert({
      tenant_id: rsvp.tenantId,
      guest_id: rsvp.guestId,
      name: rsvp.name,
      phone: rsvp.phone,
      attendance: rsvp.attendance,
      guest_count: rsvp.guestCount,
      event_type: rsvp.eventType,
      message: rsvp.message,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getClientStats(tenantId: string): Promise<ClientStats> {
  const supabase = await createAdminClient();

  const [guestsRes, rsvpRes, wishesRes, amplopRes] = await Promise.all([
    supabase
      .from("guests")
      .select("id", { count: "exact" })
      .eq("tenant_id", tenantId),
    supabase
      .from("rsvp_responses")
      .select("attendance, guest_count")
      .eq("tenant_id", tenantId),
    supabase
      .from("wishes")
      .select("id", { count: "exact" })
      .eq("tenant_id", tenantId),
    supabase
      .from("amplop_transactions")
      .select("id", { count: "exact" })
      .eq("tenant_id", tenantId),
  ]);

  const rsvpData = rsvpRes.data || [];
  return {
    tenantId,
    totalGuests: guestsRes.count || 0,
    totalRSVP: rsvpData.length,
    totalHadir: rsvpData.filter((r) => r.attendance === "hadir").length,
    totalTidakHadir: rsvpData.filter((r) => r.attendance === "tidak_hadir")
      .length,
    totalMungkin: rsvpData.filter((r) => r.attendance === "mungkin").length,
    totalWishes: wishesRes.count || 0,
    totalAmplopConfirmed: amplopRes.count || 0,
  };
}

// ============================================================
// WISHES
// ============================================================

export async function getWishesByTenant(
  tenantId: string,
  onlyApproved = false
) {
  const supabase = await createAdminClient();
  let query = supabase
    .from("wishes")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });
  if (onlyApproved) query = query.eq("is_approved", true);
  const { data, error } = await query;
  if (error) throw error;
  return data as Wish[];
}

export async function createWish(wish: {
  tenantId: string;
  name: string;
  message: string;
}) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("wishes")
    .insert({
      tenant_id: wish.tenantId,
      name: wish.name,
      message: wish.message,
      is_approved: false,
    })
    .select()
    .single();
  if (error) throw error;
  return data as Wish;
}

export async function approveWish(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("wishes")
    .update({ is_approved: true })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteWish(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("wishes").delete().eq("id", id);
  if (error) throw error;
}

// ============================================================
// THEMES
// ============================================================

export async function getAllThemes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("themes")
    .select("*")
    .eq("is_active", true)
    .order("is_premium", { ascending: true });
  if (error) throw error;
  return data as Theme[];
}

// ============================================================
// DASHBOARD STATS
// ============================================================

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createAdminClient();

  const now = new Date();
  const thirtyDaysFromNow = new Date(
    now.getTime() + 30 * 24 * 60 * 60 * 1000
  );
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).toISOString();

  const [
    activeTenantsRes,
    expiringSoonRes,
    rsvpTodayRes,
    pendingWishesRes,
    recentTenantsRes,
  ] = await Promise.all([
    supabase
      .from("tenants")
      .select("id", { count: "exact" })
      .eq("is_active", true),
    supabase
      .from("tenants")
      .select("id", { count: "exact" })
      .eq("is_active", true)
      .lte("expires_at", thirtyDaysFromNow.toISOString())
      .gte("expires_at", now.toISOString()),
    supabase
      .from("rsvp_responses")
      .select("id", { count: "exact" })
      .gte("submitted_at", todayStart),
    supabase
      .from("wishes")
      .select("id", { count: "exact" })
      .eq("is_approved", false),
    supabase
      .from("tenants")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    totalActiveClients: activeTenantsRes.count || 0,
    totalClientsExpiringSoon: expiringSoonRes.count || 0,
    totalRSVPToday: rsvpTodayRes.count || 0,
    totalPendingWishes: pendingWishesRes.count || 0,
    recentClients: (recentTenantsRes.data || []) as unknown as Tenant[],
    monthlyStats: [],
  };
}

// ============================================================
// HELPER: Convert camelCase to snake_case untuk insert/update
// ============================================================
function toSnakeCase(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      result[snakeKey] = obj[key];
    }
  }
  return result;
}
