// Convenience type aliases for Supabase tables
// These re-export from the auto-generated types to provide cleaner imports

import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

// Row types (data returned from SELECT)
export type Volunteer = Tables<'volunteers'>;
export type Contact = Tables<'contacts'>;
export type Project = Tables<'projects'>;

// Insert types (data for INSERT)
export type VolunteerInsert = TablesInsert<'volunteers'>;
export type ContactInsert = TablesInsert<'contacts'>;
export type ProjectInsert = TablesInsert<'projects'>;

// Update types (data for UPDATE)
export type VolunteerUpdate = TablesUpdate<'volunteers'>;
export type ContactUpdate = TablesUpdate<'contacts'>;
export type ProjectUpdate = TablesUpdate<'projects'>;
