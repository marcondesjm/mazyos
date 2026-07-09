-- ============================================
-- NoCode Folio - Row Level Security (RLS)
-- Políticas de segurança por tabela
-- ============================================

-- ============================================
-- HABILITAR RLS
-- ============================================
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocos ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS: perfis
-- ============================================

-- Leitura pública (qualquer um pode ver)
CREATE POLICY "Perfis são públicos"
    ON perfis FOR SELECT
    USING (true);

-- Criação: usuário logado cria para si mesmo
CREATE POLICY "Usuário cria seu próprio perfil"
    ON perfis FOR INSERT
    WITH CHECK (auth.uid() = usuario_id);

-- Atualização: apenas o dono edita
CREATE POLICY "Dono edita seu próprio perfil"
    ON perfis FOR UPDATE
    USING (auth.uid() = usuario_id);

-- Exclusão: apenas o dono exclui
CREATE POLICY "Dono exclui seu próprio perfil"
    ON perfis FOR DELETE
    USING (auth.uid() = usuario_id);

-- ============================================
-- POLÍTICAS: blocos
-- ============================================

-- Leitura pública
CREATE POLICY "Blocos são públicos"
    ON blocos FOR SELECT
    USING (true);

-- Inserção: apenas dono do perfil pode criar blocos
CREATE POLICY "Dono cria blocos no seu perfil"
    ON blocos FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM perfis
            WHERE perfis.id = blocos.perfil_id
            AND perfis.usuario_id = auth.uid()
        )
    );

-- Atualização: apenas dono do perfil pode editar blocos
CREATE POLICY "Dono edita blocos no seu perfil"
    ON blocos FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM perfis
            WHERE perfis.id = blocos.perfil_id
            AND perfis.usuario_id = auth.uid()
        )
    );

-- Exclusão: apenas dono do perfil pode excluir blocos
CREATE POLICY "Dono exclui blocos do seu perfil"
    ON blocos FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM perfis
            WHERE perfis.id = blocos.perfil_id
            AND perfis.usuario_id = auth.uid()
        )
    );

-- ============================================
-- POLÍTICAS: leads
-- ============================================

-- Leitura: apenas o dono do perfil pode ver os leads
CREATE POLICY "Dono vê leads do seu perfil"
    ON leads FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM perfis
            WHERE perfis.id = leads.perfil_id
            AND perfis.usuario_id = auth.uid()
        )
    );

-- Inserção: público pode se cadastrar (newsletter)
CREATE POLICY "Qualquer um pode se cadastrar como lead"
    ON leads FOR INSERT
    WITH CHECK (true);

-- Exclusão: apenas o dono do perfil pode excluir leads
CREATE POLICY "Dono exclui leads do seu perfil"
    ON leads FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM perfis
            WHERE perfis.id = leads.perfil_id
            AND perfis.usuario_id = auth.uid()
        )
    );
