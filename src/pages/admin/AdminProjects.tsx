import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id?: string;
  titre: string;
  description: string;
  categorie: string;
  image_url: string;
  actif: boolean;
  ordre: number;
}

const empty: Project = { titre: '', description: '', categorie: '', image_url: '', actif: true, ordre: 0 };

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);

  const load = async () => {
    const { data } = await supabase.from('projects').select('*').order('ordre');
    setProjects(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (id) {
      await supabase.from('projects').update(rest).eq('id', id);
    } else {
      await supabase.from('projects').insert([rest]);
    }
    toast.success('Projet sauvegardé');
    setEditing(null);
    load();
  };

  const toggleActif = async (p: Project) => {
    await supabase.from('projects').update({ actif: !p.actif }).eq('id', p.id!);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return;
    await supabase.from('projects').delete().eq('id', id);
    toast.success('Supprimé');
    load();
  };

  const inputClass = "w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Projets</h1>
        <button onClick={() => setEditing(empty)} className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium rounded-md px-4 py-2 hover:bg-primary-hover transition-colors">
          <Plus size={14} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="bg-card border border-border rounded-xl p-4 shadow-subtle flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{p.titre}</p>
              <p className="text-xs text-foreground-secondary truncate">{p.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleActif(p)}
                className={`text-xs px-2 py-1 rounded-full font-medium ${p.actif ? 'bg-primary/10 text-primary' : 'bg-muted text-foreground-secondary'}`}
              >
                {p.actif ? 'Actif' : 'Inactif'}
              </button>
              <button onClick={() => setEditing(p)} className="text-foreground-secondary hover:text-foreground text-xs underline">Éditer</button>
              <button onClick={() => handleDelete(p.id!)} className="text-foreground-secondary hover:text-destructive"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4" onClick={() => setEditing(null)}>
          <div className="bg-background border border-border rounded-xl shadow-subtle w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-foreground mb-4">{editing.id ? 'Modifier' : 'Nouveau projet'}</h2>
            <div className="space-y-3">
              <input placeholder="Titre" className={inputClass} value={editing.titre} onChange={(e) => setEditing({ ...editing, titre: e.target.value })} />
              <textarea placeholder="Description" rows={3} className={inputClass} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              <input placeholder="Catégorie" className={inputClass} value={editing.categorie} onChange={(e) => setEditing({ ...editing, categorie: e.target.value })} />
              <input placeholder="URL de l'image" className={inputClass} value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
              <input type="number" placeholder="Ordre" className={inputClass} value={editing.ordre} onChange={(e) => setEditing({ ...editing, ordre: parseInt(e.target.value) || 0 })} />
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={editing.actif} onChange={(e) => setEditing({ ...editing, actif: e.target.checked })} />
                Actif
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium rounded-md px-6 py-2.5 hover:bg-primary-hover transition-colors">
                <Save size={14} /> Sauvegarder
              </button>
              <button onClick={() => setEditing(null)} className="text-sm text-foreground-secondary hover:text-foreground">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
