'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './Button';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/admin/normas', label: 'Normas', icon: '📜', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { href: '/dashboard/admin/requisitos', label: 'Requisitos', icon: '📋', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { href: '/dashboard/admin/usuarios', label: 'Usuarios', icon: '👥', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { href: '/dashboard/auditor/auditorias', label: 'Auditorías', icon: '🔍', roles: ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'] },
  { href: '/dashboard/auditor/evidencias', label: 'Evidencias', icon: '📎', roles: ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'] },
  { href: '/dashboard/reports', label: 'Reportes', icon: '📈', roles: ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'] },
];

export const Sidebar = ({ role }: { role: string }) => {
  const pathname = usePathname();
  const filtered = navItems.filter(item => !item.roles || item.roles.includes(role));

  return (
    <aside className="w-64 bg-dark/90 border-r border-cyber/20 h-screen sticky top-0 flex flex-col p-4">
      <div className="text-2xl font-bold text-gold mb-8 flex items-center gap-2">
        <span>🏛️</span> Kronos
      </div>
      <nav className="flex-1 space-y-2">
        {filtered.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              pathname === item.href ? 'bg-cyber/10 border border-cyber/40 text-cyber' : 'hover:bg-white/5 text-gray-400'
            }`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
      <Button variant="outline" className="w-full" onClick={() => {/* logout */}}>
        Cerrar sesión
      </Button>
    </aside>
  );
};
