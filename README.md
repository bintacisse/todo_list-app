# todo_list-app
Application de gestion de tâches avec Docker
# Description
Une application web permettant d'ajouter, modifier, supprimer et consulter des tâches. 
L'application est développée en Python (Flask) pour le backend, HTML pour le frontend, 
et est déployée via Docker avec une base de données MySQL (ou PostgreSQL).

#Objetif

Ce projet a été réalisé dans le cadre d’un mini-projet collaboratif visant à :
Créer une application web ToDo List (ajout, modification, suppression, consultation de tâches)
Sauvegarder les données dans une base MySQL ou PostgreSQL
Déployer l’ensemble via Docker (backend, frontend, base de données, serveur web)
Travailler en équipe avec Git, en respectant une organisation claire en branches

#Equipe
Développeur : Mame Diaw Diakhoumpa
Responsable Infrastructure : Binta Cisse, Elh Souleymance Dia, Papa Abdoulaye Mbaye et
#Structure du Projet
backend/ : API Flask (Python)
frontend/ : Interface HTML
db/ : PostgreSQL
docker-compose.yml : Orchestration des services
README.md : Documentation

#Instruction d'installation
1. Cloner le dépôt :
   git clone https://github.com/votre-utilisateur/todo_list-app.git

2. Se placer dans le répertoire :
   cd todo_list-app

3. Lancer Docker :
   docker-compose up --build

4. Accéder à l’application :
   file:///C:/Users/binta.cisse/master2/todo_list-app/frontend/index.html

#Fonctionnalités
Ajouter une tâche
Modifier une tâche
Supprimer une tâche
Lister toutes les tâches

#Technologies utilisées
Python (Flask)
HTML 
Docker
PostgreSQL
Nginx 

#Consignes Git
Branche `main` : code final
Branche `infrastructure` : Docker, configs
Branche `develop` : code de développement
Chaque membre fait des commits réguliers.
