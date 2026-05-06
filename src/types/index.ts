// ============================================================
// DATABASE TYPES
// ============================================================

export type ThemeConfig = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontHeading: string;
  fontBody: string;
  fontScript: string;
  ornamentStyle: "floral" | "geometric" | "minimal" | "batik" | "celestial";
};

export type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoUrl?: string;
  qrCodeUrl?: string;
  isActive: boolean;
};

export type LottiePosition = "hero" | "couple_section" | "both";

export type Tenant = {
  id: string;
  slug: string;
  groomName: string;
  brideName: string;
  groomNickname: string;
  brideNickname: string;
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;
  groomPhotoUrl?: string;
  bridePhotoUrl?: string;
  akadDate: string;
  akadTimeStart: string;
  akadTimeEnd: string;
  akadVenueName: string;
  akadVenueAddress: string;
  akadMapsUrl?: string;
  receptionDate: string;
  receptionTimeStart: string;
  receptionTimeEnd: string;
  receptionVenueName: string;
  receptionVenueAddress: string;
  receptionMapsUrl?: string;
  themeId: string;
  coverPhotoUrl?: string;
  loveStory?: string;
  musicUrl?: string;
  isActive: boolean;
  isPasswordProtected: boolean;
  passwordHash?: string;
  showAmplopDigital: boolean;
  bankAccounts: BankAccount[];
  lottieAnimationUrl?: string;
  lottieAnimationPosition?: LottiePosition;
  expiresAt?: string;
  dresscode?: string;
  additionalNotes?: string;
  closingMessage?: string;
  createdAt: string;
  updatedAt: string;
};

export type Theme = {
  id: string;
  name: string;
  thumbnailUrl: string;
  config: ThemeConfig;
  isPremium: boolean;
  isActive: boolean;
};

export type GuestCategory = "family" | "friend" | "colleague" | "other";

export type Guest = {
  id: string;
  tenantId: string;
  name: string;
  phone?: string;
  invitationCode: string;
  category: GuestCategory;
  isVip: boolean;
  seatNumber?: string;
  notes?: string;
  createdAt: string;
};

export type AttendanceStatus = "hadir" | "tidak_hadir" | "mungkin";
export type EventType = "akad" | "resepsi" | "keduanya";

export type RSVPResponse = {
  id: string;
  tenantId: string;
  guestId?: string;
  name: string;
  phone?: string;
  attendance: AttendanceStatus;
  guestCount: number;
  eventType: EventType;
  message?: string;
  submittedAt: string;
};

export type Wish = {
  id: string;
  tenantId: string;
  name: string;
  message: string;
  isApproved: boolean;
  createdAt: string;
};

export type AmplopTransaction = {
  id: string;
  tenantId: string;
  senderName: string;
  senderPhone?: string;
  amount: number;
  bankDestination: string;
  message?: string;
  createdAt: string;
};

export type Photo = {
  id: string;
  tenantId: string;
  url: string;
  caption?: string;
  sortOrder: number;
  createdAt: string;
};

// ============================================================
// API RESPONSE TYPES
// ============================================================

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// ============================================================
// FORM TYPES
// ============================================================

export type ClientFormData = {
  groomName: string;
  brideName: string;
  groomNickname: string;
  brideNickname: string;
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;
  slug: string;
  akadDate: string;
  akadTimeStart: string;
  akadTimeEnd: string;
  akadVenueName: string;
  akadVenueAddress: string;
  akadMapsUrl?: string;
  receptionDate: string;
  receptionTimeStart: string;
  receptionTimeEnd: string;
  receptionVenueName: string;
  receptionVenueAddress: string;
  receptionMapsUrl?: string;
  dresscode?: string;
  additionalNotes?: string;
  loveStory?: string;
  musicUrl?: string;
  closingMessage?: string;
  themeId: string;
  showAmplopDigital: boolean;
  bankAccounts: BankAccount[];
  isPasswordProtected: boolean;
  password?: string;
  expiresAt?: string;
  lottieAnimationUrl?: string;
  lottieAnimationPosition?: LottiePosition;
};

export type RSVPFormData = {
  name: string;
  phone?: string;
  attendance: AttendanceStatus;
  guestCount: number;
  eventType: EventType;
  message?: string;
};

export type WishFormData = {
  name: string;
  message: string;
};

// ============================================================
// ADMIN DASHBOARD TYPES
// ============================================================

export type DashboardStats = {
  totalActiveClients: number;
  totalClientsExpiringSoon: number;
  totalRSVPToday: number;
  totalPendingWishes: number;
  recentClients: Tenant[];
  monthlyStats: { month: string; count: number }[];
};

export type ClientStats = {
  tenantId: string;
  totalGuests: number;
  totalRSVP: number;
  totalHadir: number;
  totalTidakHadir: number;
  totalMungkin: number;
  totalWishes: number;
  totalAmplopConfirmed: number;
};

// ============================================================
// INVITATION PAGE TYPES
// ============================================================

export type InvitationPageData = {
  tenant: Tenant;
  photos: Photo[];
  approvedWishes: Wish[];
  theme: Theme;
  guestName?: string;
};
