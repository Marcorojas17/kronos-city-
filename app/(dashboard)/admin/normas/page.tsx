'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Norma {
  id: string;
  codigo: string;
  titulo: string;
  tipo: string;
}

export default function NormasPage() {
  const [normas, setNormas] = useState<Norma[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/normas')
      .then(res => res.json())
      .then(data => { setNormas(data); setLoading(false); });
  }, []);

  if (loading) return <div className="text-cyber">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gold">Normas</h1>
        <Link href="/dashboard/admin/normas/nueva">
          <Button>➕ Nueva Norma</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {normas.map(n => (
          <Card key={n.id} title={`${n.codigo} - ${n.tipo}`} subtitle={n.titulo}>
            <Link href={`/dashboard/admin/normas/${n.id}`}>
              <Button variant="outline" size="sm">Ver requisitos</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
