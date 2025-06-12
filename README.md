# ToDo List Application

Une application web de gestion de tâches avec interface utilisateur intuitive et stockage des données dans une base de données PostgreSQL.

## Fonctionnalités

- Ajout, modification, suppression et consultation des tâches
- Filtrage des tâches par statut (terminées, actives, toutes)
- Tri des tâches par date d'échéance, priorité, ou date de création
- Recherche de tâches par titre ou description
- Interface responsive adaptée à tous les appareils
- Mode sombre/clair

## Architecture

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js avec Express
- **Base de données**: PostgreSQL
- **Déploiement**: Docker et Docker Compose

## Démarrage

### Prérequis

- Docker et Docker Compose installés sur votre machine

### Installation et lancement

1. Clonez ce dépôt
2. Depuis la racine du projet, exécutez:

```bash
docker-compose up -d
```

L'application sera accessible à l'adresse `http://localhost`.

## Développement

Pour le développement local sans Docker:

1. Lancez le frontend:

```bash
npm install
npm run dev
```

2. Dans un autre terminal, lancez le backend:

```bash
cd api
npm install
npm run dev
```

## Structure du projet

```
/
├── api/                    # Backend API
│   ├── src/                # Code source du backend
│   ├── Dockerfile          # Configuration Docker pour le backend
│   └── package.json        # Dépendances du backend
├── src/                    # Code source du frontend
│   ├── components/         # Composants React
│   ├── hooks/              # Hooks personnalisés
│   ├── types/              # Types TypeScript
│   └── utils/              # Fonctions utilitaires
├── Dockerfile              # Configuration Docker pour le frontend
├── docker-compose.yml      # Configuration Docker Compose
└── nginx.conf              # Configuration Nginx
```