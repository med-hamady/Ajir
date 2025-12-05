-- Configuration du Storage pour les avatars
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- 1. Créer le bucket 'avatars' s'il n'existe pas déjà
-- Note: Cela doit être fait via l'interface Supabase Storage ou via la fonction insert
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Configurer les politiques de sécurité (RLS) pour le bucket avatars

-- Permettre à tout le monde de voir les avatars (lecture publique)
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Permettre aux utilisateurs authentifiés d'uploader leurs propres avatars
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Permettre aux utilisateurs de mettre à jour leur propre avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Permettre aux utilisateurs de supprimer leur propre avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
