# Guide: Création du Bucket Avatars dans Supabase

## ⚠️ IMPORTANT: Cette étape est OBLIGATOIRE pour que l'upload de photos fonctionne !

## Étapes Détaillées

### Étape 1: Accéder à Supabase Storage

1. Connectez-vous à [https://supabase.com](https://supabase.com)
2. Sélectionnez votre projet TChallenge
3. Dans le menu de gauche, cliquez sur **Storage** (icône de dossier)

### Étape 2: Créer le Bucket

1. Cliquez sur le bouton **"New bucket"** (en haut à droite)
2. Remplissez le formulaire:
   - **Name:** `avatars` (exactement ce nom, sans majuscules)
   - **Public bucket:** ✅ **COCHEZ CETTE CASE** (très important!)
   - File size limit: `5242880` (5 MB en bytes) ou laissez vide
   - Allowed MIME types: Laissez vide pour accepter tous les types d'images
3. Cliquez sur **"Create bucket"**

### Étape 3: Vérifier que le Bucket est Public

1. Dans la liste des buckets, vous devriez voir `avatars`
2. Vérifiez qu'il y a une icône "🌐" ou "Public" à côté
3. Si ce n'est pas le cas:
   - Cliquez sur les 3 points ⋮ à côté du bucket
   - Sélectionnez "Edit bucket"
   - Cochez "Public bucket"
   - Sauvegardez

### Étape 4: Configurer les Politiques (Optionnel mais Recommandé)

**Option Simple (Recommandée pour commencer):**

1. Allez dans **Storage** → Cliquez sur le bucket `avatars`
2. Cliquez sur l'onglet **"Policies"**
3. Cliquez sur **"New Policy"**
4. Sélectionnez **"For full customization"**
5. Créez 2 politiques:

**Politique 1 - Lecture Publique:**
```
Policy name: Public Access
Allowed operation: SELECT
Target roles: public
USING expression: true
```

**Politique 2 - Upload Utilisateurs:**
```
Policy name: Authenticated Upload
Allowed operation: INSERT
Target roles: authenticated
WITH CHECK expression: true
```

**Option Avancée (Via SQL):**

1. Allez dans **SQL Editor**
2. Créez une nouvelle query
3. Copiez-collez ce code:

```sql
-- Permettre à tout le monde de lire les avatars
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Permettre aux utilisateurs authentifiés d'uploader
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Permettre aux utilisateurs de mettre à jour leurs avatars
CREATE POLICY "Users can update avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars');

-- Permettre aux utilisateurs de supprimer leurs avatars
CREATE POLICY "Users can delete avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');
```

4. Cliquez sur **"Run"**

### Étape 5: Tester

1. Retournez sur votre application: http://localhost:5173/profile
2. Connectez-vous avec votre compte
3. Cliquez sur l'icône caméra 📷 sur votre avatar
4. Sélectionnez une image
5. Si vous voyez un message d'erreur détaillé, il vous dira exactement quel est le problème

## Résolution des Problèmes Courants

### Erreur: "Bucket not found"
**Solution:** Le bucket n'existe pas. Retournez à l'Étape 2 et créez-le.

### Erreur: "new row violates row-level security policy"
**Solution:** Le bucket n'est pas public OU les politiques ne sont pas configurées.
- Vérifiez que "Public bucket" est coché
- Ajoutez les politiques de l'Étape 4

### Erreur: "The resource already exists"
**Solution:** Le bucket existe déjà, passez à l'Étape 3 pour vérifier qu'il est public.

### L'image s'upload mais ne s'affiche pas
**Solution:** Le bucket n'est probablement pas public.
1. Allez dans Storage → avatars
2. Cliquez sur l'icône ⋮ → "Edit bucket"
3. Cochez "Public bucket"

## Vérification Finale

Pour vérifier que tout fonctionne:

1. Uploadez une image de test
2. Allez dans **Storage** → **avatars**
3. Vous devriez voir votre image uploadée
4. Cliquez dessus → Vous devriez voir un bouton "Get URL"
5. Si vous pouvez ouvrir cette URL dans un navigateur, tout fonctionne!

## Capture d'Écran de la Configuration Correcte

Votre écran Storage devrait ressembler à:
```
📁 Buckets
  └─ 🌐 avatars (public)
     ├─ Policies (2-4 policies configurées)
     └─ Files (vos images uploadées)
```

## Besoin d'Aide?

Si après avoir suivi toutes ces étapes l'upload ne fonctionne toujours pas:

1. Vérifiez la console du navigateur (F12) pour voir les erreurs détaillées
2. Vérifiez que vos variables d'environnement Supabase sont correctes dans `.env`:
   ```
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_clé_anon
   ```
3. Redémarrez le serveur de développement: `npm run dev`
