# Guide de Déploiement CareWay (ISIS Cloud)

Tous les fichiers de configuration Kubernetes ont été créés dans le répertoire `k8s/`. Voici la procédure pour mettre votre application en ligne.

## 1. Préparer les images Docker

Vous devez construire et envoyer vos images sur un registre (ex: GitLab). Remplacez `<votre-projet>` par le chemin de votre projet GitLab.

### Se connecter au registre
```powershell
docker login registry.gitlab.com
```

### Construire et Pousser le Backend
```powershell
cd backend
docker build -t manar2/careway-backend:latest .
docker push manar2/careway-backend:latest
cd ..
```

### Construire et Pousser le Frontend
**Attention** : Le frontend doit connaître l'URL de l'API de production.
```powershell
cd frontend
docker build --build-arg REACT_APP_API_URL=https://careway-api.chl.connected-health.fr -t manar2/careway-frontend:latest .
docker push manar2/careway-frontend:latest
cd ..
```

## 2. Déploiement sur le Cluster

Une fois les images poussées, assurez-vous d'avoir mis à jour les noms d'images dans `k8s/backend-k8s.yaml` et `k8s/frontend-k8s.yaml`.

### Appliquer les configurations
```powershell
kubectl apply -f k8s/database-secret.yaml
kubectl apply -f k8s/backend-k8s.yaml
kubectl apply -f k8s/frontend-k8s.yaml
kubectl apply -f k8s/ingress.yaml
```

## 3. Vérification

Vérifiez que tout tourne :
```powershell
kubectl get pods -n ptutcare
kubectl get ingress -n ptutcare
```

L'application sera accessible sur : `https://careway.chl.connected-health.fr`
