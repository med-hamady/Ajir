-- SOLUTION COMPLÈTE pour le Storage Avatars
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- 1. Supprimer toutes les anciennes politiques (si elles existent)
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete avatars" ON storage.objects;

-- 2. Créer des politiques SIMPLES et FONCTIONNELLES

-- Politique 1: TOUT LE MONDE peut lire les avatars (PUBLIC)
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Politique 2: Les utilisateurs AUTHENTIFIÉS peuvent uploader
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Politique 3: Les utilisateurs AUTHENTIFIÉS peuvent mettre à jour
CREATE POLICY "Authenticated users can update avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars');

-- Politique 4: Les utilisateurs AUTHENTIFIÉS peuvent supprimer
CREATE POLICY "Authenticated users can delete avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');

-- 3. Vérifier que le bucket existe et est public
UPDATE storage.buckets
SET public = true
WHERE id = 'avatars';

-- Message de confirmation
SELECT 'Politiques configurées avec succès! Vous pouvez maintenant uploader des avatars.' as message;
