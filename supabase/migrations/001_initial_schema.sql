-- ================================================================
-- ENABLE EXTENSIONS
-- ================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================================
-- ENUM TYPES
-- ================================================================
CREATE TYPE guest_category AS ENUM ('family', 'friend', 'colleague', 'other');
CREATE TYPE attendance_status AS ENUM ('hadir', 'tidak_hadir', 'mungkin');
CREATE TYPE event_type AS ENUM ('akad', 'resepsi', 'keduanya');
CREATE TYPE lottie_position AS ENUM ('hero', 'couple_section', 'both');
CREATE TYPE ornament_style AS ENUM ('floral', 'geometric', 'minimal', 'batik', 'celestial');

-- ================================================================
-- TABLE: themes
-- ================================================================
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  thumbnail_url VARCHAR(500),
  config JSONB NOT NULL DEFAULT '{}',
  is_premium BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================================
-- TABLE: tenants
-- ================================================================
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) NOT NULL UNIQUE,
  
  -- Identitas Mempelai
  groom_name VARCHAR(200) NOT NULL,
  bride_name VARCHAR(200) NOT NULL,
  groom_nickname VARCHAR(100) NOT NULL,
  bride_nickname VARCHAR(100) NOT NULL,
  groom_father VARCHAR(200) NOT NULL,
  groom_mother VARCHAR(200) NOT NULL,
  bride_father VARCHAR(200) NOT NULL,
  bride_mother VARCHAR(200) NOT NULL,
  groom_photo_url VARCHAR(500),
  bride_photo_url VARCHAR(500),
  
  -- Detail Acara Akad
  akad_date DATE NOT NULL,
  akad_time_start TIME NOT NULL,
  akad_time_end TIME NOT NULL,
  akad_venue_name VARCHAR(300) NOT NULL,
  akad_venue_address TEXT NOT NULL,
  akad_maps_url VARCHAR(500),
  
  -- Detail Acara Resepsi
  reception_date DATE NOT NULL,
  reception_time_start TIME NOT NULL,
  reception_time_end TIME NOT NULL,
  reception_venue_name VARCHAR(300) NOT NULL,
  reception_venue_address TEXT NOT NULL,
  reception_maps_url VARCHAR(500),
  
  -- Info Tambahan Acara
  dresscode VARCHAR(200),
  additional_notes TEXT,
  closing_message TEXT,
  
  -- Konten & Media
  theme_id UUID REFERENCES themes(id) ON DELETE SET NULL,
  cover_photo_url VARCHAR(500),
  love_story TEXT,
  music_url VARCHAR(500),
  
  -- Konfigurasi
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_password_protected BOOLEAN NOT NULL DEFAULT false,
  password_hash VARCHAR(255),
  show_amplop_digital BOOLEAN NOT NULL DEFAULT false,
  bank_accounts JSONB NOT NULL DEFAULT '[]',
  
  -- Lottie Animation Add-on
  lottie_animation_url VARCHAR(500),
  lottie_animation_position lottie_position,
  
  -- Metadata
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_is_active ON tenants(is_active);
CREATE INDEX idx_tenants_expires_at ON tenants(expires_at);

-- ================================================================
-- TABLE: photos
-- ================================================================
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  caption VARCHAR(300),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_photos_tenant_id ON photos(tenant_id);

-- ================================================================
-- TABLE: guests
-- ================================================================
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(20),
  invitation_code VARCHAR(20) NOT NULL UNIQUE,
  category guest_category NOT NULL DEFAULT 'friend',
  is_vip BOOLEAN NOT NULL DEFAULT false,
  seat_number VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_guests_tenant_id ON guests(tenant_id);
CREATE INDEX idx_guests_invitation_code ON guests(invitation_code);

-- ================================================================
-- TABLE: rsvp_responses
-- ================================================================
CREATE TABLE rsvp_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(20),
  attendance attendance_status NOT NULL,
  guest_count INTEGER NOT NULL DEFAULT 1,
  event_type event_type NOT NULL DEFAULT 'keduanya',
  message TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rsvp_tenant_id ON rsvp_responses(tenant_id);
CREATE INDEX idx_rsvp_phone ON rsvp_responses(phone);
CREATE INDEX idx_rsvp_submitted_at ON rsvp_responses(submitted_at);

-- ================================================================
-- TABLE: wishes
-- ================================================================
CREATE TABLE wishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_wishes_tenant_id ON wishes(tenant_id);
CREATE INDEX idx_wishes_is_approved ON wishes(is_approved);

-- ================================================================
-- TABLE: amplop_transactions
-- ================================================================
CREATE TABLE amplop_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  sender_name VARCHAR(200) NOT NULL,
  sender_phone VARCHAR(20),
  amount INTEGER NOT NULL DEFAULT 0,
  bank_destination VARCHAR(100) NOT NULL,
  message VARCHAR(300),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_amplop_tenant_id ON amplop_transactions(tenant_id);

-- ================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_themes_updated_at
  BEFORE UPDATE ON themes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================================

-- Aktifkan RLS di semua tabel
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE amplop_transactions ENABLE ROW LEVEL SECURITY;

-- THEMES: Publik bisa baca, hanya service_role yang bisa write
CREATE POLICY "themes_select_all" ON themes FOR SELECT USING (true);
CREATE POLICY "themes_insert_service" ON themes FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "themes_update_service" ON themes FOR UPDATE USING (auth.role() = 'service_role');

-- TENANTS: Publik bisa baca yang aktif, service_role untuk write
CREATE POLICY "tenants_select_active" ON tenants FOR SELECT USING (is_active = true);
CREATE POLICY "tenants_select_service" ON tenants FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "tenants_insert_service" ON tenants FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "tenants_update_service" ON tenants FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "tenants_delete_service" ON tenants FOR DELETE USING (auth.role() = 'service_role');

-- PHOTOS: Publik bisa baca, service_role untuk write
CREATE POLICY "photos_select_all" ON photos FOR SELECT USING (true);
CREATE POLICY "photos_insert_service" ON photos FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "photos_update_service" ON photos FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "photos_delete_service" ON photos FOR DELETE USING (auth.role() = 'service_role');

-- GUESTS: Hanya service_role yang bisa akses
CREATE POLICY "guests_all_service" ON guests FOR ALL USING (auth.role() = 'service_role');

-- RSVP: Publik bisa insert, service_role untuk baca/update
CREATE POLICY "rsvp_insert_all" ON rsvp_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "rsvp_select_service" ON rsvp_responses FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "rsvp_update_service" ON rsvp_responses FOR UPDATE USING (auth.role() = 'service_role');

-- WISHES: Publik bisa insert & baca yang approved, service_role untuk semua
CREATE POLICY "wishes_insert_all" ON wishes FOR INSERT WITH CHECK (true);
CREATE POLICY "wishes_select_approved" ON wishes FOR SELECT USING (is_approved = true);
CREATE POLICY "wishes_select_service" ON wishes FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "wishes_update_service" ON wishes FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "wishes_delete_service" ON wishes FOR DELETE USING (auth.role() = 'service_role');

-- AMPLOP: Publik bisa insert, service_role untuk baca
CREATE POLICY "amplop_insert_all" ON amplop_transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "amplop_select_service" ON amplop_transactions FOR SELECT USING (auth.role() = 'service_role');

-- ================================================================
-- SEED DATA: Default Themes
-- ================================================================
INSERT INTO themes (id, name, thumbnail_url, config, is_premium, is_active) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'Sakura',
  '/images/themes/sakura-thumb.jpg',
  '{"primaryColor":"#F4A7B9","secondaryColor":"#FDF2F8","accentColor":"#E8748A","backgroundColor":"#FDF8F0","textColor":"#4A2C2A","fontHeading":"Cormorant Garamond","fontBody":"Lato","fontScript":"Great Vibes","ornamentStyle":"floral"}',
  false,
  true
),
(
  '00000000-0000-0000-0000-000000000002',
  'Ivory Elegance',
  '/images/themes/ivory-thumb.jpg',
  '{"primaryColor":"#C9A96E","secondaryColor":"#FDF8F0","accentColor":"#8B6914","backgroundColor":"#FAFAF7","textColor":"#2D2D2D","fontHeading":"Cormorant Garamond","fontBody":"Lato","fontScript":"Great Vibes","ornamentStyle":"minimal"}',
  false,
  true
),
(
  '00000000-0000-0000-0000-000000000003',
  'Botanical',
  '/images/themes/botanical-thumb.jpg',
  '{"primaryColor":"#84A98C","secondaryColor":"#F0F4F0","accentColor":"#52796F","backgroundColor":"#F8FAF8","textColor":"#2F3E46","fontHeading":"Cormorant Garamond","fontBody":"Lato","fontScript":"Great Vibes","ornamentStyle":"floral"}',
  false,
  true
),
(
  '00000000-0000-0000-0000-000000000004',
  'Celestial Dark',
  '/images/themes/celestial-thumb.jpg',
  '{"primaryColor":"#F4D03F","secondaryColor":"#1E3A5F","accentColor":"#C9A96E","backgroundColor":"#0D1B2A","textColor":"#F0F0F0","fontHeading":"Cormorant Garamond","fontBody":"Lato","fontScript":"Great Vibes","ornamentStyle":"celestial"}',
  true,
  true
),
(
  '00000000-0000-0000-0000-000000000005',
  'Batik Heritage',
  '/images/themes/batik-thumb.jpg',
  '{"primaryColor":"#8B4513","secondaryColor":"#FDF0E8","accentColor":"#D2691E","backgroundColor":"#FDF5EC","textColor":"#3D1C02","fontHeading":"Cormorant Garamond","fontBody":"Lato","fontScript":"Great Vibes","ornamentStyle":"batik"}',
  true,
  true
);
