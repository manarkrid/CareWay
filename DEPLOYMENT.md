# Guide de Déploiement CareWay 🚀

Ce document explique comment déployer l'application et quelles variables d'environnement sont nécessaires.

## 📌 Architecture
- **Frontend** : React (Hébergement suggéré : Vercel / Netlify)
- **Backend** : NestJS (Hébergement suggéré : Railway / Render / VPS)
- **Base de données** : MySQL

## 🐳 Exécution locale avec Docker Desktop

Puisque vous avez **Docker Desktop** lancé, vous pouvez démarrer toute l'application (Frontend + Backend + MySQL) avec une seule commande :

1. Ouvrez un terminal à la racine du projet.
2. Lancez la commande suivante :
   ```powershell
   docker-compose up --build
   ```
3. L'application sera accessible sur :
   - **Frontend** : [http://localhost:3000](http://localhost:3000)
   - **Backend** : [http://localhost:3001/api](http://localhost:3001/api)
   - **Base de données** : Port `3306` (avec les identifiants définis dans le `.yml`)

---

## 🔧 Variables d'Environnement

### Backend (Production)
Configurez ces variables sur votre plateforme d'hébergement :

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `PORT` | Port d'écoute du serveur | `3001` |
| `DB_HOST` | Hôte de la base de données | `mon-mysql.railway.app` |
| `DB_PORT` | Port MySQL | `3306` |
| `DB_USERNAME` | Utilisateur MySQL | `root` |
| `DB_PASSWORD` | Mot de passe MySQL | `*********` |
| `DB_DATABASE` | Nom de la base de données | `careway` |
| `JWT_SECRET` | Clé secrète pour les tokens | `une-cle-tres-secrete` |
| `FRONTEND_URL` | URL(s) du frontend autorisé(s) (CORS) | `https://careway.vercel.app` |

### Frontend (Production)
Ces variables doivent être définies lors du build du frontend :

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `REACT_APP_API_URL` | URL de base de votre API Backend | `https://mon-api.railway.app/api` |

---

## 🚀 Étapes de Déploiement

### 1. Base de données
- Créez une instance MySQL.
- Importez votre schéma (si nécessaire) ou laissez TypeORM gérer si vous activez `synchronize: true` temporairement (non recommandé en prod).
- Note : L'application est actuellement configurée avec `synchronize: false`.

### 2. Backend
- Connectez votre dépôt GitHub à **Railway** ou **Render**.
- Le répertoire racine pour le backend est `./backend`.
- Commande de build : `npm install && npm run build`
- Commande de démarrage : `npm run start:prod`
- Ajoutez les variables d'environnement listées ci-dessus.

### 3. Frontend
- Connectez votre dépôt GitHub à **Vercel**.
- Le répertoire racine pour le frontend est `./frontend`.
- Vercel détectera automatiquement l'application React.
- Ajoutez la variable `REACT_APP_API_URL`.

---

## ✅ Vérification
Une fois déployé, vérifiez que :
1. L'URL du frontend est bien listée dans `FRONTEND_URL` du backend.
2. L'URL du backend (avec le suffixe `/api`) est bien renseignée dans `REACT_APP_API_URL` du frontend.
