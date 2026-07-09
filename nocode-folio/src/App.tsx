import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { User, LogIn, LogOut, UserPlus } from 'lucide-react'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')

  // Verificar sessão atual
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (error) {
        console.error('Erro ao verificar sessão:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listener de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    if (!email) return

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      })

      if (error) throw error

      alert('Link de acesso enviado para seu email!')
      setEmail('')
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      alert(error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-violet-400">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/40 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            NoCode Folio
          </h1>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-violet-400" />
                <span>{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 transition-opacity"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600">
              <UserPlus className="w-4 h-4" />
              <span>Entrar</span>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {!user ? (
          <div className="max-w-md mx-auto">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Acesse sua conta</h2>

              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-violet-500/50 focus:outline-none transition-colors"
                />

                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 transition-opacity"
                >
                  <LogIn className="w-4 h-4" />
                  Enviar Link de Acesso
                </button>
              </div>

              <p className="text-sm text-slate-400 mt-4 text-center">
                Enviaremos um link mágico para seu email
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Bem-vindo ao NoCode Folio!</h2>
            <p className="text-slate-300 mb-8">
              Você está logado e pronto para criar sua página pessoal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 hover:border-violet-500/50 transition-colors">
                <h3 className="font-bold mb-2">Seu Perfil</h3>
                <p className="text-sm text-slate-400">
                  Gerencie seus dados públicos
                </p>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 hover:border-violet-500/50 transition-colors">
                <h3 className="font-bold mb-2">Blocos</h3>
                <p className="text-sm text-slate-400">
                  Adicione links, textos e imagens
                </p>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 hover:border-violet-500/50 transition-colors">
                <h3 className="font-bold mb-2">Design</h3>
                <p className="text-sm text-slate-400">
                  Customize cores e layout
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
