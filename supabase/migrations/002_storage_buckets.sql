-- Buat storage bucket untuk foto-foto
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('photos', 'photos', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('themes', 'themes', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- RLS untuk storage
CREATE POLICY "photos_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'photos');
CREATE POLICY "photos_service_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'photos' AND auth.role() = 'service_role');
CREATE POLICY "photos_service_delete" ON storage.objects FOR DELETE USING (bucket_id = 'photos' AND auth.role() = 'service_role');

CREATE POLICY "themes_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'themes');
CREATE POLICY "themes_service_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'themes' AND auth.role() = 'service_role');
