import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, Users, Mail, FolderOpen, LogOut } from 'lucide-react';

const links = [
  { label: 'Vue d\'ensemble', path: '/admin', icon: LayoutDashboard },
  { label: 'Bénévoles', path: '/admin/volunteers', icon: Users },
  { label: 'Messages', path: '/admin/messages', icon: Mail },
  { label: 'Projets', path: '/admin/projects', icon: FolderOpen },
];

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login');
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate('/admin/login');
    });

    supabase.from('contacts').select('id', { count: 'exact' }).eq('lu', false).then(({ count }) => {
      setUnread(count ?? 0);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-foreground-secondary">Chargement...</div>;

  return (
    <div className="min-h-screen flex bg-background-alt">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 bg-sidebar flex-col border-r border-sidebar-border">
        <div className="p-6">
          <span className="text-lg font-bold text-sidebar-foreground">Kechart</span>
          <span className="text-xs text-sidebar-foreground/50 ml-2">Admin</span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {links.map((l) => {
            const active = location.pathname === l.path;
            return (
              <Link
                key={l.path}
                to={l.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active ? 'bg-sidebar-accent text-sidebar-primary' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <l.icon size={18} />
                {l.label}
                {l.label === 'Messages' && unread > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">{unread}</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-3">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 w-full">
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border flex justify-around py-2">
        {links.map((l) => {
          const active = location.pathname === l.path;
          return (
            <Link key={l.path} to={l.path} className={`flex flex-col items-center gap-0.5 text-[10px] ${active ? 'text-sidebar-primary' : 'text-sidebar-foreground/60'}`}>
              <l.icon size={20} />
              {l.label.split(' ')[0]}
            </Link>
          );
        })}
      </nav>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 pb-20 md:pb-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
