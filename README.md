### Les commandes suivantes sont à effectuer dans le répertoire cloné depuis ce dépôt

## Installation

Pour déployer les conteneurs, il faut faire :

```
docker-compose up -d --build
```

Vérifiez l'état des conteneurs avec :
```
docker ps
```

S'il s'agit de la première fois que vous démarrez docker-compose dans le répertoire actif, il est normal que des conteneurs soient manquants car certains dépendent des bases de données MySQL.

Les conteneurs MySQL sont en cours d'initialisation et afin de  démarrer les services qui n'ont pas pu être lancés, il faut attendre qu'elle soit terminée.\
**Cela prend du temps si c'est la première fois si vous démarrez docker-compose dans le répertoire actif (pas de fichiers dans volumes/db)**

Vous pouvez vérifier cela en faisant (par exemple pour le service inventory) :
```
docker logs microservices_inventory_db_1
```

Il faut que la BDD soit prête à recevoir des connexions dans les logs.
Vous pouvez essayer de vous connecter sur le service adminer (voir plus bas), pour voir si vous accédez bien à la BDD.

Ensuite, faire encore une fois :

```
docker-compose up -d --build
```

Vérifiez que vous avez bien tous les conteneurs de lancé avec : ```docker ps```

Voici les différents endpoints de l'application (voir docker/front/default.conf) :

```
localhost 				  -->  point d'entrée unique exposé au web (front angular)
localhost/api/inventory   -->  back du service inventory
localhost/authentication  -->  back du service authentication
```

## Réinstallation propre

Supprimez les conteneurs créés précédement à coup de docker-compose :

```
docker-compose down -v
```

Détruire les conteneurs **(attention cela effacera tous vos conteneurs docker !)** :

```
docker rm $(docker ps -qa)
```

Détruire les images **(attention cela effacera toutes vos images docker !)** :

```
docker rmi $(docker images -q)
```

S'il reste des images dont il faut forcer la suppression :

```
docker system prune -a
```

Supprimer les data des BDD :

```
sudo rm -rf volumes/db/
```

Puis se référer à la section [Installation](#installation)

## Aide

#### Général

Pour redémarrer un service, par exemple pour le service inventory, faire :

```
docker-compose restart inventory
```

### Backend

Les dépendances python se situent dans ```docker/back/requirements.txt```

#### Service Inventory

Pour travailler avec l'API CRUD voici quelques commandes curl que vous pouvez lancer dans votre terminal (si vos conteneurs sont en marche) :

```
curl -H "Content-Type: application/json" -X POST -d '{"name":"Lenovo Legion Y520", "description":"PC Portable i5-7500H GTX 1060", "price":"450"}' http://localhost/api/inventory/products
curl -H "Content-Type: application/json" -X PUT -d '{"name":"Lenovo Legion Y520", "description":"PC Portable i5-7500H GTX 1060", "price":"460"}' http://localhost/api/inventory/products/1
curl -X DELETE http://localhost/api/inventory/products/1
```

#### Service Adminer

Pensez à aller sur ```localhost:8080``` pour accéder aux BDD via adminer, les identifiants sont dans le fichier .env qui est à la racine de ce dépôt.