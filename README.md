# Script d'automatisation pour Google Sheets

Ce projet contient un script Google Apps Script conçu pour automatiser la gestion des validations et notifications dans une feuille Google Sheets. Le script surveille les modifications apportées à des colonnes spécifiques et envoie des emails en fonction des statuts détectés.

## Fonctionnalités principales

- Surveiller les modifications dans les colonnes suivantes :
  - **Colonne E** : Étape de production.
  - **Colonne F** : Statut (validation).
  - **Colonne G** : Commentaire du validateur.
  - **Colonne H** : Statut `send/pending`.

- Envoi automatique d'emails :
  - À l'utilisateur ayant fait une demande pour lui notifier des changements.
  - Aux administrateurs, pour validation, si le statut est spécifique.

- Journalisation détaillée des actions pour un débogage efficace.

## Prérequis

Avant d'exécuter ce script, assurez-vous que :
- Vous avez accès à une feuille Google Sheets avec les colonnes mentionnées.
- Les permissions nécessaires pour exécuter des scripts Google Apps sont activées.
- Votre compte Google est configuré pour l'envoi d'emails via **GmailApp**.

## Installation

1. Ouvrez votre feuille Google Sheets.
2. Accédez à **Extensions** > **Apps Script**.
3. Collez le code dans l'éditeur de scripts.
4. Enregistrez et déployez le script comme déclencheur installable pour l'événement `onEdit`.

## Utilisation

- **Mise à jour de données** : Lorsque certaines colonnes surveillées sont modifiées, le script envoie des notifications en fonction des statuts.
- **Validation anglaise** : Des emails spécifiques sont envoyés lorsque des statuts nécessitent une revue pour la version anglaise.

## Exemple d'exécution

Lorsqu'un utilisateur modifie la colonne `H` (statut `send`), le script effectue les actions suivantes :
1. Enregistre toutes les modifications pertinentes.
2. Envoie un email à l'utilisateur pour l'informer des changements.
3. Si le statut le demande, notifie également un administrateur pour la validation.

## Structure du code

Le script est divisé en plusieurs sections :
1. **Initialisation** : Lecture des données de la cellule modifiée.
2. **Validation des statuts** : Vérification des colonnes surveillées et des valeurs.
3. **Envoi des emails** : Génération et envoi des notifications correspondantes.
4. **Journalisation** : Ajout d'informations aux journaux pour suivre l'exécution.

## Lien utile

Accédez directement à votre document Google Sheets via ce lien :
[Document Google Sheets](https://docs.google.com/spreadsheets/d/1tdyVXPYA7COYcCYCTEXCpFme2QiNK13rQ9MWbfQdbeY/edit?gid=703706411)

---

## Contributions

Les contributions sont les bienvenues ! Si vous trouvez un bug ou souhaitez ajouter une fonctionnalité, n'hésitez pas à ouvrir une **issue** ou une **pull request**.

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus d'informations.
