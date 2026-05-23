-- ================================================================
-- Migration: Add "Jawa Hijau" theme (third Javanese variant)
-- ================================================================
-- A fresh forest-green variant of the Javanese wedding theme
-- with Islamic elements and Instagram support.
-- ================================================================

-- 1. Add Jawa Hijau theme
INSERT INTO themes (id, name, thumbnail_url, config, is_premium, is_active) VALUES
(
  '00000000-0000-0000-0000-000000000009',
  'Jawa Hijau',
  '/images/themes/jawa-hijau-thumb.jpg',
  '{"primaryColor":"#1B5E20","secondaryColor":"#F5F0E8","accentColor":"#D4A843","backgroundColor":"#FFFAF5","textColor":"#1A1A1A","fontHeading":"Cormorant Garamond","fontBody":"Lato","fontScript":"Great Vibes","ornamentStyle":"jawa-hijau"}',
  true,
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  thumbnail_url = EXCLUDED.thumbnail_url,
  config = EXCLUDED.config,
  is_premium = EXCLUDED.is_premium,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- 2. Add Instagram columns to tenants table
ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS groom_instagram TEXT,
ADD COLUMN IF NOT EXISTS bride_instagram TEXT;
