# WIKENVA — Site complet

Site officiel WIKENVA : marketplace numérique, présentation du projet, candidatures partenaires, vérification des candidatures et espace administrateur.

## Installation

Prérequis : Node.js 22 et Bun.

```bash
bun install
cp .env.example .env
```

Renseignez dans `.env` les valeurs publiques de connexion fournies par votre backend Lovable Cloud, puis lancez :

```bash
bun run dev
```

## Vérifications

```bash
bunx vitest run
bun run build
```

## Déploiement Vercel

Importez ce dossier ou son dépôt GitHub dans Vercel. Utilisez Node.js 22, la commande de build `bun run build`, puis renseignez les six variables présentes dans `.env.example`. Ne choisissez pas de dossier de sortie manuel.

## Base de données

Les migrations SQL sont incluses dans `supabase/migrations`. Les règles d'accès, les rôles administrateurs et les fonctions serveur font partie de l'archive. Aucune donnée personnelle ni aucun mot de passe n'est inclus.

## Identité visuelle

Les polices, couleurs, images, logos, icônes de navigateur et styles WIKENVA sont inclus dans `src` et `public`.
