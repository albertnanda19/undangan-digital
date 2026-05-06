-- ================================================================
-- Migration: Add "Minang Heritage" theme
-- ================================================================
-- Adds a new culturally-themed wedding template inspired by
-- Minangkabau heritage (saluak, suntiang, marawa, rumah gadang).
-- Reusable across tenants by setting tenants.theme_id to this row.
-- ================================================================

INSERT INTO themes (id, name, thumbnail_url, config, is_premium, is_active) VALUES
(
  '00000000-0000-0000-0000-000000000006',
  'Minang Heritage',
  '/images/themes/minang-thumb.jpg',
  '{"primaryColor":"#A93226","secondaryColor":"#FBEEE6","accentColor":"#D4AC0D","backgroundColor":"#FDF8F0","textColor":"#3B1F0E","fontHeading":"Cormorant Garamond","fontBody":"Lato","fontScript":"Great Vibes","ornamentStyle":"minang"}',
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
