import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Download, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Volunteer } from '@/types/database';

export default function AdminVolunteers() {
  const [data, setData] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Volunteer | null>(null);

  const load = async () => {
    setLoading(true);
    const { data: d } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false });
    setData(d ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = data.filter((v) =>
    `${v.prenom} ${v.nom} ${v.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const header = 'Prénom,Nom,Email,Téléphone,Date\n';
    const rows = data.map((v) => `${v.prenom},${v.nom},${v.email},${v.telephone},${v.created_at}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'benevoles.csv';
    a.click();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce bénévole ?')) return;
    await supabase.from('volunteers').delete().eq('id', id);
    toast.success('Supprimé');
    setSelected(null);
    load();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bénévoles</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
            <input
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium rounded-md px-4 py-2 hover:bg-primary-hover transition-colors">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background-alt">
                <th className="text-left px-4 py-3 font-medium text-foreground-secondary">Nom</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-secondary hidden sm:table-cell">Email</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-secondary hidden md:table-cell">Téléphone</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-secondary hidden lg:table-cell">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-4 py-3"><div className="h-4 w-32 bg-muted rounded animate-pulse" /></td>
                    <td className="px-4 py-3 hidden sm:table-cell"><div className="h-4 w-40 bg-muted rounded animate-pulse" /></td>
                    <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 w-28 bg-muted rounded animate-pulse" /></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-24 bg-muted rounded animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-4 bg-muted rounded animate-pulse" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-foreground-secondary">
                    {search ? 'Aucun résultat pour cette recherche.' : 'Aucun bénévole pour le moment.'}
                  </td>
                </tr>
              ) : (
                filtered.map((v) => (
                  <tr key={v.id} className="border-b border-border hover:bg-background-alt/50 cursor-pointer" onClick={() => setSelected(v)}>
                    <td className="px-4 py-3 text-foreground">{v.prenom} {v.nom}</td>
                    <td className="px-4 py-3 text-foreground-secondary hidden sm:table-cell">{v.email}</td>
                    <td className="px-4 py-3 text-foreground-secondary hidden md:table-cell">{v.telephone}</td>
                    <td className="px-4 py-3 text-foreground-secondary hidden lg:table-cell">{new Date(v.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(v.id); }} className="text-foreground-secondary hover:text-destructive"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20" onClick={() => setSelected(null)}>
          <div className="bg-background w-full max-w-md h-full p-6 shadow-subtle overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-foreground">Détail</h2>
              <button onClick={() => setSelected(null)}><X size={20} className="text-foreground-secondary" /></button>
            </div>
            <dl className="space-y-4 text-sm">
              {([['Prénom', selected.prenom], ['Nom', selected.nom], ['Email', selected.email], ['Téléphone', selected.telephone], ['Message', selected.message], ['Date', new Date(selected.created_at).toLocaleString('fr-FR')]] as const).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-foreground-secondary font-medium">{k}</dt>
                  <dd className="text-foreground mt-1">{v || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
