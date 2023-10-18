Description: API permettant de réaliser les fonctionnalités simples CRUD sur une table de users avec PHP et MYSQL.
URL du serveur: http://localhost/IDAW/TP4/exo5/api/user

Endpoints:

- /create.php: Permet de créer un utilisateur

  Méthode: POST

  Paramètres:

  - name: nom de l'utilisateur à ajouter dans le corps de la requête de type string. Paramètre obligatoire
  - email: email de l'utilisateur à ajouter dans le corps de la requête de type string. Paramètre obligatoire

  Réponses:

  - "200": Utilisateur créé avec succès.
  - "400": Data incomplète.
  - "503": Problème serveur.

- /read.php: Permet de récupérer l'ensemble des utilisateurs

  Méthode: GET

  Paramètres: aucun

  Réponses:

  - "200": Listes des utilisateurs diponibles.
  - "404": Aucun utilisateur trouvé.

- /read_one.php?id={id}: Permet de récupérer 1 utilisateur donné en paramètre.

  Méthode: GET

  Paramètres:

  - id: id de l'utilisateur à ajouter dans l'url de la requête. Paramètre obligatoire

  Réponses:

  - "200": Utilisateur retourné.
  - "404": L'utilisateur n'existe pas.

- /read_pagin.php?page={page}: Permet de récupérer une pagination de la liste des utilisateurs.

  Méthode: GET

  Paramètres:

  - page: page demandée à ajouter dans l'url de la requête. Paramètre non obligatoire.

  Réponses:

  - "200": Pagination des utilisateurs retournée.
  - "404": Pas d'utilisateur trouvé.

- /update.php: Permet de modifier un utilisateur.

  Méthode: PUT

  Paramètres:

  - id: Id de l'utilisateur à modifier à ajouter dans le corps de la requête de type number. Paramètre obligatoire.
  - name: Nom de l'utilisateur à modifier à ajouter dans le corps de la requête de type string. Paramètre obligatoire.
  - email: Email de l'utilisateur à modifier à ajouter dans le corps de la requête de type string. paramètre obligatoire.

  Réponses:

  - "200": Utilisateur modifié.
  - "503": Problème serveur.

- /delete.php: Permet de supprimer un utilisateur.

  Méthode: DELETE

  Paramètres:

  - id: Id de l'utilisateur à supprimer à ajouter dans le corps de la requête de type number. paramètre obligatoire.

  Réponses:

  - "200": Utilisateur supprimé.
  - "503": Problème serveur.

- /search.php?name={motCle}: Permet de chercher un utilisateur par un mot clé reflétant le nom d'utilisateur.

  Méthode: GET

  Paramètres:

  - motCle: mot clé permettant de faire une recherche sur les noms d'utilisateur à ajouter dans l'url de la requête de type string. Paramètre non obligatoire.

  Réponses:

  - "200": Liste des utilisateurs dont leur nom contient le mot clé.
  - "404": Aucun utilisateur trouvé.
