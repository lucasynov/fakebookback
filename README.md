# fakebook back

Prérequis : 

Avoir une connexion internet et un git bash avec un ordinateur fonctionnel. 

Clone du projet :

### `git clone  https://github.com/lucasynov/fakebookback.git`


Se déplacer dedans : 

### `cd fakebookback`


Installation des modules node : 

### `npm install`

Lancement du serveur :

### `node server`


Ports utilisés : 

8001 : socket.io;
8000 : REST API


Connexion sur Moogose en ligne 


Lien vers le front : 

### `https://github.com/lucasynov/fakebookfront`


Si jamais vous vouliez changer de base de données il faudrait alors changer : 

### `const dbURI = "mongodb+srv://lucas:"+mdp.mdp+"@cluster0-np5ub.mongodb.net/fakebook?retryWrites=true";`
Dans server.js

Et modifier les mots de passe dans configDb.js et dans config.js 