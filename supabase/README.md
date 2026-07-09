# Supabase - NoCode Folio

## Estrutura

```
supabase/
  migrations/
    001_criar_tabelas.sql   -- Tabelas, índices e triggers
    002_rls_policies.sql     -- Políticas de segurança (RLS)
```

## Como Aplicar

### Opção 1: Supabase Dashboard (SQL Editor)

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Execute os arquivos na ordem:
   - `001_criar_tabelas.sql` primeiro
   - `002_rls_policies.sql` depois

### Opção 2: Supabase CLI

```bash
# Login
npx supabase login

# Link ao projeto
npx supabase link --project-ref mhdermskrgmqoiiabjie

# Push migrations
npx supabase db push
```

## Tabelas Criadas

| Tabela   | Descrição                      |
|----------|--------------------------------|
| perfis   | Dados públicos do usuário      |
| blocos   | Widgets da grid (link, etc)    |
| leads    | Emails capturados (newsletter) |

## Estrutura do JSONB (conteúdo dos blocos)

```json
// Tipo: link
{"url": "https://exemplo.com", "rotulo": "Meu Site"}

// Tipo: mapa
{"lat": -23.55, "lng": -46.63, "endereco": "Av Paulista, 1000"}

// Tipo: texto
{"texto": "minha-chave-pix", "tipo_copia": true}

// Tipo: imagem
{"url": "https://...", "alt": "Descrição da imagem"}

// Tipo: video
{"video_id": "abc123", "tipo": "youtube"}
```

## Autenticação

- **Trigger automático**: Ao criar usuário via Auth, um perfil é criado automaticamente
- **Métodos suportados**: Magic Link, Anthropic OAuth

## Variáveis de Ambiente

```env
VITE_SUPABASE_URL=https://mhdermskrgmqoiiabjie.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon
```
