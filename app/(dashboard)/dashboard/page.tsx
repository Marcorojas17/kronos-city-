'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [stats, setStats] = useState({ normas: 0, requisitos: 0, auditorias: 0, cumplimiento: 0 });
  const router = useRouter();

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gold animate-glow">Panel de Control</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <p className="text-4xl font-bold text-cyber">{stats.normas}</p>
          <p className="text-gray-400">Normas registradas</p>
        </Card>
        <Card className="text-center">
          <p className="text-4xl font-bold text-cyber">{stats.requisitos}</p>
          <p className="text-gray-400">Requisitos totales</p>
        </Card>
        <Card className="text-center">
          <p className="text-4xl font-bold text-cyber">{stats.auditorias}</p>
          <p className="text-gray-400">Auditorías realizadas</p>
        </Card>
        <Card className="text-center">
          <p className="text-4xl font-bold text-gold">{stats.cumplimiento}%</p>
          <p className="text-gray-400">Cumplimiento general</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Acciones rápidas">
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/auditor/auditorias/nueva">
              <Button>➕ Nueva Auditoría</Button>
            </Link>
            <Link href="/dashboard/admin/normas">
              <Button variant="secondary">📜 Gestionar Normas</Button>
            </Link>
            <Link href="/dashboard/reports">
              <Button variant="outline">📈 Ver Reportes</Button>
            </Link>
          </div>
        </Card>
        <Card title="Últimas auditorías">
          <ul className="space-y-2 text-gray-300">
            <li className="flex justify-between border-b border-cyber/10 py-2">
              <span>ISO 9001 - Proceso 1</span>
              <span className="text-gold">92%</span>
            </li>
            <li className="flex justify-between border-b border-cyber/10 py-2">
              <span>NOM-001 - Seguridad</span>
              <span className="text-gold">78%</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
