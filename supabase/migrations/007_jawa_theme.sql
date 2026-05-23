-- ================================================================
-- Migration: Add "Jawa" theme
-- ================================================================
-- Adds a culturally-themed wedding template inspired by
-- Javanese heritage (wayang, batik, gunungan, candi).
-- Reusable across tenants by setting tenants.theme_id to this row.
-- ================================================================

INSERT INTO themes (id, name, thumbnail_url, config, is_premium, is_active) VALUES
(
  '00000000-0000-0000-0000-000000000007',
  'Jawa',
  '/images/themes/jawa-thumb.jpg',
  '{"primaryColor":"#5C3A21","secondaryColor":"#F5E6D3","accentColor":"#C9A96E","backgroundColor":"#FDF5EC","textColor":"#1A1A1A","fontHeading":"Cormorant Garamond","fontBody":"Lato","fontScript":"Great Vibes","ornamentStyle":"jawa"}',
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
