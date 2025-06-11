# ToDo List Application

Une application web de gestion de tâches avec interface utilisateur intuitive et stockage des données dans une base de données PostgreSQL.

# Objetif

Ce projet a été réalisé dans le cadre d’un mini-projet collaboratif visant à :
Créer une application web ToDo List (ajout, modification, suppression, consultation de tâches)
Sauvegarder les données dans une base MySQL ou PostgreSQL
Déployer l’ensemble via Docker (backend, frontend, base de données, serveur web)
Travailler en équipe avec Git, en respectant une organisation claire en branches

# Consignes Git
Branche `main` : code final
Branche `infrastructure` : Docker, configs
Branche `develop` : code de développement
Chaque membre fait des commits réguliers.

# Equipe
Développeur : Mame Diaw Diakhoumpa
Responsable Infrastructure : Binta Cisse, Elh Souleymance Dia, Papa Abdoulaye Mbaye

## Fonctionnalités

- Ajout, modification, suppression et consultation des tâches
- Filtrage des tâches par statut (terminées, actives, toutes)
- Tri des tâches par date d'échéance, priorité, ou date de création
- Recherche de tâches par titre ou description


## Architecture

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js avec Express
- **Base de données**: PostgreSQL
- **Déploiement**: Docker et Docker Compose

todo-list-app/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── Dockerfile
├── infrastructure/
│   ├── nginx/
│   │   └── nginx.conf
│   └── db/
│       └── init.sql
└── docker-compose.yml

## Démarrage

### Prérequis

- Docker et Docker Compose installés sur votre machine

### Installation et lancement

1. Clonez ce dépôt
   git clone https://github.com/binta.cisse/master2/todo_list-app.git
2. Depuis la racine du projet, déplacer dans le répertoire todo_list-app
  cd C:\Users\binta.cisse\master2\todo_list-app
3.  exécutez la commande
```bash
docker-compose up --build 
```
L'application sera accessible à l'adresse http://localhost:8080.

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

## Technologies utilisées

Backend	Python 
Frontend	HTML 
Base de données	MySQL / PostgreSQL
Serveur Web	Nginx 
Conteneurisation	Docker
Orchestration	Docker Compose
Versioning	Git

