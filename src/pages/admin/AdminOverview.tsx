import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, Mail, FolderOpen, UserPlus } from 'lucide-react';
import type { Volunteer, Contact } from '@/types/database';

interface Stats {
  volunteers: number;
  unread: number;
  activeProjects: number;
  lastVolunteer: string;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats>({ volunteers: 0, unread: 0, activeProjects: 0, lastVolunteer: '—' });
  const [loading, setLoading] = useState(true);
  const [recentVolunteers, setRecentVolunteers] = useState<Volunteer[]>([]);
  const [recentMessages, setRecentMessages] = useState<Contact[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from('volunteers').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5),
      supabase.from('contacts').select('*', { count: 'exact' }).eq('lu', false),
      supabase.from('projects').select('id', { count: 'exact' }).eq('actif', true),
      supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
    ]).then(([volRes, msgRes, projRes, recentMsgRes]) => {
      setStats({
        volunteers: volRes.count ?? 0,
        unread: msgRes.count ?? 0,
        activeProjects: projRes.count ?? 0,
        lastVolunteer: volRes.data?.[0]?.created_at ? new Date(volRes.data[0].created_at).toLocaleDateString('fr-FR') : '—',
      });
      setRecentVolunteers(volRes.data ?? []);
      setRecentMessages(recentMsgRes.data ?? []);
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: 'Total bénévoles', value: stats.volunteers, icon: Users },
    { label: 'Messages non lus', value: stats.unread, icon: Mail },
    { label: 'Projets actifs', value: stats.activeProjects, icon: FolderOpen },
    { label: 'Dernière inscription', value: stats.lastVolunteer, icon: UserPlus },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Vue d'ensemble</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5 shadow-subtle">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <c.icon size={18} className="text-primary" />
              </div>
              <span className="text-sm text-foreground-secondary font-medium">{c.label}</span>
            </div>
            {loading ? (
              <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-foreground">{c.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
          <h3 className="text-sm font-semibold text-foreground mb-4">Derniers bénévoles</h3>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
                <div className="h-4 w-28 bg-muted rounded animate-pulse" />
                <div className="h-4 w-36 bg-muted rounded animate-pulse" />
              </div>
            ))
          ) : recentVolunteers.length === 0 ? (
            <p className="text-sm text-foreground-secondary">Aucun bénévole pour le moment.</p>
          ) : (
            recentVolunteers.map((v) => (
              <div key={v.id} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                <span className="text-foreground">{v.prenom} {v.nom}</span>
                <span className="text-foreground-secondary">{v.email}</span>
              </div>
            ))
          )}
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
          <h3 className="text-sm font-semibold text-foreground mb-4">Derniers messages</h3>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                <div className="h-4 w-40 bg-muted rounded animate-pulse" />
              </div>
            ))
          ) : recentMessages.length === 0 ? (
            <p className="text-sm text-foreground-secondary">Aucun message pour le moment.</p>
          ) : (
            recentMessages.map((m) => (
              <div key={m.id} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                <span className="text-foreground">{m.nom}</span>
                <span className="text-foreground-secondary truncate max-w-[200px]">{m.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
