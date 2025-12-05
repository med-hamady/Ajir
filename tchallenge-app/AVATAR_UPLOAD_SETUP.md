# Configuration de l'Upload de Photos de Profil

## Fonctionnalités Ajoutées

✅ Les utilisateurs peuvent uploader leur propre photo de profil
✅ Les photos sont stockées dans Supabase Storage
✅ L'avatar s'affiche dans le Header et sur la page Profile
✅ Bouton avec icône caméra pour changer facilement la photo

## Configuration Requise dans Supabase

### Étape 1: Créer le Bucket Storage

1. Connectez-vous à votre projet Supabase
2. Allez dans **Storage** dans le menu de gauche
3. Cliquez sur **New bucket**
4. Créez un bucket avec les paramètres suivants:
   - Name: `avatars`
   - Public: ✅ **Coché** (pour que les avatars soient accessibles publiquement)
   - File size limit: 5 MB (recommandé)
   - Allowed MIME types: `image/*`

### Étape 2: Configurer les Politiques RLS

Vous avez deux options:

#### Option A: Via l'Interface Supabase (Recommandé pour débutants)

1. Allez dans **Storage** → **Policies**
2. Sélectionnez le bucket `avatars`
3. Ajoutez les politiques suivantes via l'interface:

**Politique 1: Lecture publique**
- Name: `Avatar images are publicly accessible`
- Operation: SELECT
- Policy: `true` (ou laissez vide pour public)

**Politique 2: Upload**
- Name: `Users can upload their own avatar`
- Operation: INSERT
- Policy:
```sql
bucket_id = 'avatars' AND auth.uid() IS NOT NULL
```

**Politique 3: Mise à jour**
- Name: `Users can update their own avatar`
- Operation: UPDATE
- Policy:
```sql
bucket_id = 'avatars' AND auth.uid() IS NOT NULL
```

**Politique 4: Suppression**
- Name: `Users can delete their own avatar`
- Operation: DELETE
- Policy:
```sql
bucket_id = 'avatars' AND auth.uid() IS NOT NULL
```

#### Option B: Via SQL (Plus rapide)

1. Allez dans **SQL Editor** dans Supabase
2. Copiez et exécutez le contenu du fichier `supabase/STORAGE_SETUP.sql`

### Étape 3: Vérification

1. Testez l'upload en vous connectant à l'application
2. Allez sur votre page Profile
3. Cliquez sur l'icône caméra sur votre avatar
4. Sélectionnez une image
5. Vérifiez que:
   - L'image s'upload correctement
   - L'avatar se met à jour sur la page Profile
   - L'avatar se met à jour dans le Header

## Structure des Fichiers

```
avatars/
  ├── {user_id}-{random}.jpg
  ├── {user_id}-{random}.png
  └── ...
```

Les avatars sont stockés avec un nom unique incluant:
- L'ID de l'utilisateur
- Un nombre aléatoire pour éviter les conflits
- L'extension du fichier original

## Formats d'Image Acceptés

- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ GIF (.gif)
- ✅ WebP (.webp)

## Taille Maximale Recommandée

- **5 MB** par image
- Les images sont automatiquement redimensionnées côté client (recommandation future)

## Sécurité

- ✅ Seuls les utilisateurs authentifiés peuvent uploader
- ✅ Les utilisateurs ne peuvent uploader que pour leur propre profil
- ✅ Les avatars sont publiquement accessibles (lecture seule)
- ✅ Les politiques RLS protègent contre les accès non autorisés

## Dépannage

### Problème: "Error uploading avatar"

**Cause possible**: Le bucket n'existe pas ou n'est pas configuré correctement

**Solution**:
1. Vérifiez que le bucket `avatars` existe dans Storage
2. Vérifiez que le bucket est public
3. Vérifiez les politiques RLS

### Problème: "Permission denied"

**Cause possible**: Les politiques RLS ne sont pas configurées

**Solution**:
1. Exécutez le script `supabase/STORAGE_SETUP.sql`
2. Ou ajoutez les politiques manuellement via l'interface

### Problème: L'avatar ne s'affiche pas

**Cause possible**: URL incorrecte ou permissions

**Solution**:
1. Vérifiez dans Supabase Storage que le fichier existe
2. Testez l'URL directement dans le navigateur
3. Vérifiez que le bucket est bien public

## Améliorations Futures

- [ ] Redimensionnement automatique des images côté client
- [ ] Recadrage avant upload
- [ ] Support du drag & drop
- [ ] Prévisualisation avant upload
- [ ] Compression automatique des images
- [ ] Suppression de l'ancien avatar lors de l'upload d'un nouveau
