'use client'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm p-8 rounded-2xl border">
        <h1 className="text-2xl font-semibold mb-2">WealthOS</h1>
        <p className="text-sm text-gray-500 mb-8">
          Your personal investment tracker
        </p>
        <button onClick={signIn}
          className="w-full py-3 px-4 bg-white border rounded-xl
                     flex items-center justify-center gap-3
                     text-sm font-medium hover:bg-gray-50">
          Continue with Google
        </button>
      </div>
    </div>
  )
}