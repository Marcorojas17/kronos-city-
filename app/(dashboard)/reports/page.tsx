'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ReportsPage() {
  const [auditorias, setAuditorias] = useState([]);

  useEffect(() => {
    fetch('/api/auditorias')
      .then(res => res.json())
      .then(data => setAuditorias(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gold mb-6">Reportes de Cumplimiento</h1>
      <div className="space-y-4">
        {auditorias.map((aud: any) => (
          <Card key={aud.id} title={aud.titulo} subtitle={`Área: ${aud.area || 'General'}`}>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-cyber">
                {aud.puntuacion ? `${aud.puntuacion.toFixed(1)}%` : 'Pendiente'}
              </span>
              <Button variant="outline" size="sm">Descargar PDF</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
