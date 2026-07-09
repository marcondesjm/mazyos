-- ============================================
-- NoCode Folio - Storage (Supabase Storage)
-- Buckets para avatares e imagens
-- ============================================

-- ============================================
-- BUCKET: avatars
-- Armazena fotos de perfil
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatares', 'avatares', true)
ON CONFLICT (id) DO NOTHING;

-- Política: qualquer um pode ver avatares
CREATE POLICY "Avatar é público"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatares');

-- Política: usuário logado pode fazer upload do próprio avatar
CREATE POLICY "Usuário faz upload do próprio avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatares'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Política: usuário logado pode atualizar o próprio avatar
CREATE POLICY "Usuário atualiza o próprio avatar"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'avatares'
        AND auth.uid()::text = (storage.foldername(name))[1]
    )
    WITH CHECK (
        bucket_id = 'avatares'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Política: usuário logado pode deletar o próprio avatar
CREATE POLICY "Usuário deleta o próprio avatar"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'avatares'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- ============================================
-- BUCKET: blocos
-- Armazena imagens dos blocos
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('blocos', 'blocos', true)
ON CONFLICT (id) DO NOTHING;

-- Política: qualquer um pode ver imagens dos blocos
CREATE POLICY "Imagens de blocos são públicas"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'blocos');

-- Política: usuário autenticado pode fazer upload
CREATE POLICY "Usuário autenticado pode fazer upload de imagens"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'blocos'
        AND auth.role() = 'authenticated'
    );

-- Política: usuário autenticado pode deletar suas próprias imagens
CREATE POLICY "Usuário pode deletar suas próprias imagens"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'blocos'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );
