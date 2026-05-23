-- ================================================================
-- Migration: Add "Jawa Madu" theme (second Javanese variant)
-- ================================================================
-- A warm caramel-brown variant of the Javanese wedding theme,
-- featuring Kawung batik motif and SoganBorder framing.
-- Completely different visual direction from the original "Jawa" theme.
-- ================================================================

INSERT INTO themes (id, name, thumbnail_url, config, is_premium, is_active) VALUES
(
  '00000000-0000-0000-0000-000000000008',
  'Jawa Madu',
  '/images/themes/jawa-madu-thumb.jpg',
  '{"primaryColor":"#A67C52","secondaryColor":"#F5E6D3","accentColor":"#D4A843","backgroundColor":"#FFFAF0","textColor":"#3D2B1F","fontHeading":"Cormorant Garamond","fontBody":"Lato","fontScript":"Great Vibes","ornamentStyle":"jawa-madu"}',
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
