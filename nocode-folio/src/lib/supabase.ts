import { createClient } from '@supabase/supabase-js'

// Tipos das tabelas
export interface Perfil {
  id: number
  usuario_id: string
  slug: string
  nome_completo: string | null
  bio: string | null
  avatar_url: string | null
  configuracao_tema: Record<string, any> | null
  criado_em: string
  atualizado_em: string
}

export interface Bloco {
  id: number
  perfil_id: number
  tipo: 'link' | 'imagem' | 'texto' | 'mapa' | 'video'
  titulo: string | null
  conteudo: Record<string, any>
  colunas: number
  linhas: number
  ordem: number
  visivel: boolean
  criado_em: string
  atualizado_em: string
}

export interface Lead {
  id: number
  perfil_id: number
  email: string
  criado_em: string
}

// Configuração
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validação
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export type Tables = {
  perfis: Perfil
  blocos: Bloco
  leads: Lead
}

export type Enums = {
  tipo_bloco: 'link' | 'imagem' | 'texto' | 'mapa' | 'video'
}