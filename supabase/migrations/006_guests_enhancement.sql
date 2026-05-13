CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(20),
  invitation_code VARCHAR(20) NOT NULL,
  category VARCHAR(20) NOT NULL DEFAULT 'friend',
  is_vip BOOLEAN NOT NULL DEFAULT false,
  seat_number VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'guests_invitation_code_key'
  ) THEN
    ALTER TABLE guests ADD CONSTRAINT guests_invitation_code_key UNIQUE (invitation_code);
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS idx_guests_tenant_id ON guests(tenant_id);
CREATE INDEX IF NOT EXISTS idx_guests_invitation_code ON guests(invitation_code);
CREATE INDEX IF NOT EXISTS idx_guests_phone ON guests(phone, tenant_id);

ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'guests' AND policyname = 'guests_all_service'
  ) THEN
    CREATE POLICY "guests_all_service" ON guests FOR ALL USING (auth.role() = 'service_role');
  END IF;
END$$;
