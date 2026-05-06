DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'religion') THEN
    CREATE TYPE religion AS ENUM ('islam', 'kristen', 'katolik', 'hindu', 'buddha', 'konghucu');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'time_zone') THEN
    CREATE TYPE time_zone AS ENUM ('WIB', 'WITA', 'WIT');
  END IF;
END
$$;

ALTER TABLE tenants
  ADD COLUMN IF NOT EXISTS religion religion NOT NULL DEFAULT 'islam',
  ADD COLUMN IF NOT EXISTS groom_birth_order VARCHAR(100),
  ADD COLUMN IF NOT EXISTS bride_birth_order VARCHAR(100),
  ADD COLUMN IF NOT EXISTS time_zone time_zone NOT NULL DEFAULT 'WIB',
  ADD COLUMN IF NOT EXISTS gift_address TEXT,
  ADD COLUMN IF NOT EXISTS gift_notes TEXT,
  ADD COLUMN IF NOT EXISTS qris_image_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS show_gift_address BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_qris BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS lottie_auto_select BOOLEAN NOT NULL DEFAULT true;
