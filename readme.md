{
"openapi": "3.0.3",
"info": {
"title": "User API",
"description": "C'est une simple API permettant de réaliser les fonctionnalités simples CRUD sur une table de users avec PHP et MYSQL.",
"contact": {
"email": "gabriel.ivanes@etu.imt-nord-europe.fr"
},
"version": "1.0.0"
},
"servers": [
{
"url": "http://localhost/IDAW/TP4/API_REST/api/user"
}
],
"tags": [
{
"name": "user",
"description": "CRUD sur les users"
}
],
"paths": {
"/create.php": {
"post": {
"tags": [
"user"
],
"summary": "Crée un utilisateur",
"description": "Crée un utilisateur avec les informations données en entrée",
"parameters": [
{
"name": "user",
"in": "query",
"description": "Le nom d'utilisateur",
"required": true,
"schema": {
"type": "string"
}
},
{
"name": "email",
"in": "query",
"description": "L'email de l'utilisateur",
"required": true,
"schema": {
"type": "string"
}
}
],
"responses": {
"200": {
"description": "Opération réussie"
},
"400": {
"description": "Data incomplète"
},
"503": {
"description": "Problème serveur"
}
}
}
},
"/read.php": {
"get": {
"tags": [
"user"
],
"summary": "Récupérer tous les utilisateurs",
"description": "Récupère tous les utilisateurs de la base de donnée",
"responses": {
"200": {
"description": "Opération réussie"
},
"404": {
"description": "Aucun utilisateur trouvé"
}
}
}
},
"/read_one.php?id={id}": {
"get": {
"tags": [
"user"
],
"summary": "Récupérer un utilisateur",
"description": "Récupère un utilisateur à partir de son id.",
"parameters": [
{
"name": "id",
"in": "path",
"description": "L'id de l'utilisateur",
"required": true,
"schema": {
"type": "number"
}
}
],
"responses": {
"200": {
"description": "Opération réussie"
},
"404": {
"description": "L'utilisateur n'existe pas"
}
}
}
},
"/read_paging.php?page={page}": {
"get": {
"tags": [
"user"
],
"summary": "Pagination de la liste des utilisateurs",
"description": "Pagination de la liste des utilisateurs et récupération de la liste des utilisateurs d'une page.",
"parameters": [
{
"name": "page",
"in": "path",
"description": "Numéro de la page",
"required": false,
"schema": {
"type": "string"
}
}
],
"responses": {
"200": {
"description": "Opération réussie"
},
"404": {
"description": "Pas d'utilisateur trouvé"
}
}
}
},
"/update.php": {
"put": {
"tags": [
"user"
],
"summary": "Modifier l'utilisateur",
"description": "Modifie l'utilisateur avec les données entrées dans le body.",
"parameters": [
{
"name": "id",
"in": "query",
"description": "Id de l'utilisateur à modifier",
"required": true,
"schema": {
"type": "number"
}
},
{
"name": "name",
"in": "query",
"description": "Nom d'utilisateur",
"required": true,
"schema": {
"type": "string"
}
},
{
"name": "email",
"in": "query",
"description": "Email de l'utilisateur",
"required": true,
"schema": {
"type": "string"
}
}
],
"responses": {
"200": {
"description": "Opération réussie"
},
"503": {
"description": "Problème serveur"
}
}
}
},
"/delete.php": {
"delete": {
"tags": [
"user"
],
"summary": "Supprimer l'utilisateur",
"description": "Supprime l'utilisateur donné dans le body",
"parameters": [
{
"name": "id",
"in": "query",
"description": "Id de l'utilisateur à supprimer",
"required": true,
"schema": {
"type": "number"
}
}
],
"responses": {
"200": {
"description": "Opération réussie"
},
"503": {
"description": "Problème serveur"
}
}
}
},
"/search.php?name={motCle}": {
"get": {
"tags": [
"user"
],
"summary": "Chercher un ou plusieurs utilisateurs en fonction d'un mot clé",
"description": "Cherche un ou plusieurs utilisateurs en fontion du mot clé inscrit dans la requête.",
"parameters": [
{
"name": "motCle",
"in": "path",
"description": "nom d'utilisateur (complet ou non)",
"required": false,
"schema": {
"type": "number"
}
}
],
"responses": {
"200": {
"description": "Opération réussie"
},
"404": {
"description": "Aucun utilisateur trouvé"
}
}
}
}
},
"components": {
"schemas": {
"User": {
"type": "object",
"properties": {
"id": {
"type": "integer",
"format": "int64",
"example": 10
},
"name": {
"type": "string",
"example": "John"
},
"email": {
"type": "string",
"example": "john@email.com"
}
}
}
}
}
}
