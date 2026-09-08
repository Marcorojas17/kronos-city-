'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de red');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyber/10 via-dark to-dark">
      <Card className="w-full max-w-md p-8 border-cyber/50">
        <h1 className="text-3xl font-bold text-gold text-center mb-2">KRONOS CITY</h1>
        <p className="text-center text-gray-400 mb-8">Sistema de Autoauditoría Premium</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-black/50 border border-cyber/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyber"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-black/50 border border-cyber/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyber"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">Ingresar</Button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-500">
          Credenciales demo: admin@kronos.city / AdminCity2026!
        </div>
      </Card>
    </div>
  );
}
