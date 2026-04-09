import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';
import type { Contact } from '@/types/database';

export default function AdminMessages() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  const load = async () => {
    setLoading(true);
    const { data: d } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    setData(d ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (msg: Contact) => {
    setSelected(msg);
    if (!msg.lu) {
      await supabase.from('contacts').update({ lu: true }).eq('id', msg.id);
      load();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Messages</h1>

      <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background-alt">
                <th className="text-left px-4 py-3 font-medium text-foreground-secondary">Nom</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-secondary hidden sm:table-cell">Email</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-secondary hidden md:table-cell">Aperçu</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-secondary hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 font-medium text-foreground-secondary">Statut</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-4 py-3"><div className="h-4 w-24 bg-muted rounded animate-pulse" /></td>
                    <td className="px-4 py-3 hidden sm:table-cell"><div className="h-4 w-36 bg-muted rounded animate-pulse" /></td>
                    <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 w-48 bg-muted rounded animate-pulse" /></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 w-20 bg-muted rounded animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-5 w-14 bg-muted rounded-full animate-pulse" /></td>
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-foreground-secondary">
                    Aucun message pour le moment.
                  </td>
                </tr>
              ) : (
                data.map((m) => (
                  <tr key={m.id} className="border-b border-border hover:bg-background-alt/50 cursor-pointer" onClick={() => markRead(m)}>
                    <td className={`px-4 py-3 ${!m.lu ? 'font-semibold text-foreground' : 'text-foreground'}`}>{m.nom}</td>
                    <td className="px-4 py-3 text-foreground-secondary hidden sm:table-cell">{m.email}</td>
                    <td className="px-4 py-3 text-foreground-secondary truncate max-w-[200px] hidden md:table-cell">{m.message}</td>
                    <td className="px-4 py-3 text-foreground-secondary hidden lg:table-cell">{new Date(m.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${m.lu ? 'bg-muted text-foreground-secondary' : 'bg-primary/10 text-primary'}`}>
                        {m.lu ? 'Lu' : 'Non lu'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20" onClick={() => setSelected(null)}>
          <div className="bg-background w-full max-w-md h-full p-6 shadow-subtle overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-foreground">Message</h2>
              <button onClick={() => setSelected(null)}><X size={20} className="text-foreground-secondary" /></button>
            </div>
            <dl className="space-y-4 text-sm">
              <div><dt className="text-foreground-secondary font-medium">Nom</dt><dd className="text-foreground mt-1">{selected.nom}</dd></div>
              <div><dt className="text-foreground-secondary font-medium">Email</dt><dd className="text-foreground mt-1">{selected.email}</dd></div>
              <div><dt className="text-foreground-secondary font-medium">Message</dt><dd className="text-foreground mt-1 whitespace-pre-wrap">{selected.message}</dd></div>
              <div><dt className="text-foreground-secondary font-medium">Date</dt><dd className="text-foreground mt-1">{new Date(selected.created_at).toLocaleString('fr-FR')}</dd></div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
