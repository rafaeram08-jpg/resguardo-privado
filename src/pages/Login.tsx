import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error en la autenticación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>{isLogin ? 'Iniciar Sesión' : 'Registro'} | LexLFPIORPI</title>
        <meta name="description" content="Accede a tu panel de control de LexLFPIORPI para gestionar RFCs, monitorear listas negras del SAT y cumplir con la normativa LFPIORPI." />
      </Helmet>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          className="flex justify-center items-center gap-2 font-bold text-2xl tracking-tight cursor-pointer mb-6"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center">
              <ShieldCheck className="text-white" size={24} />
          </div>
          <span className="text-slate-900">Lex<span className="text-emerald-700">LFPIORPI</span></span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea una cuenta nueva'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="ejemplo@empresa.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#10B981] hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Iniciar sesión' : 'Registrarse')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                {isLogin ? 'Crear cuenta ahora' : 'Inicia sesión aquí'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
