function onEditInstallable(e) {
    // Vérifie si l'événement est défini avant de commencer
    if (!e) return;

    // Récupère la feuille de calcul active et la cellule modifiée
    const sheet = e.source.getActiveSheet();
    const range = e.range;
    const editedRow = range.getRow();
    const editedColumn = range.getColumn();

    // Définition des colonnes surveillées
    const colE = 5; // Étape de production
    const colF = 6; // Statut (clé de validation)
    const colG = 7; // Commentaire du validateur
    const colH = 8; // Statut send/pending

    // Vérifie si la colonne modifiée est parmi celles qui nous intéressent
    if (![colE, colF, colG, colH].includes(editedColumn)) return;

    // Récupère les valeurs pertinentes de la ligne modifiée
    const rubrique = sheet.getRange(editedRow, 2).getValue(); // Colonne B : Rubrique
    const emailUtilisateur = sheet.getRange(editedRow, 4).getValue(); // Colonne D : Email
    const status = sheet.getRange(editedRow, colF).getValue(); // Colonne F : Statut de validation
    const sendStatus = sheet.getRange(editedRow, colH).getValue().toLowerCase().trim(); // Colonne H : Send/Pending

    // Enregistre des informations dans les journaux pour le débogage
    Logger.log("------ Début du traitement ------");
    Logger.log(`Ligne modifiée : ${editedRow}, Colonne modifiée : ${editedColumn}`);
    Logger.log(`Rubrique : ${rubrique}`);
    Logger.log(`Email utilisateur récupéré : ${emailUtilisateur}`);
    Logger.log(`Statut de validation : ${status}`);
    Logger.log(`Statut Send/Pending : ${sendStatus}`);

    // Vérifie si le statut "send" est présent avant de continuer
    if (sendStatus !== "send") {
        Logger.log("Le statut n'est pas 'send', aucun email ne sera envoyé.");
        Logger.log("------ Fin du traitement ------");
        return;
    }

    // Rassemble les modifications détectées pour l'inclure dans le message
    const modifications = [];
    if (sheet.getRange(editedRow, colE).getValue() !== "") {
        modifications.push(`Étape de production : ${sheet.getRange(editedRow, colE).getValue()}`);
    }
    if (status !== "") {
        modifications.push(`Statut (Validation) : ${status}`);
    }
    if (sheet.getRange(editedRow, colG).getValue() !== "") {
        modifications.push(`Commentaire du validateur : ${sheet.getRange(editedRow, colG).getValue()}`);
    }

    // Affiche les modifications détectées dans les journaux
    Logger.log(`Modifications détectées : ${modifications.join(", ")}`);

    // Lien vers le document Google Sheets
    const sheetUrl = "https://docs.google.com/spreadsheets/d/1tdyVXPYA7COYcCYCTEXCpFme2QiNK13rQ9MWbfQdbeY/edit?gid=703706411";

    // Envoi d'un email au demandeur si des modifications sont détectées
    if (modifications.length > 0) {
        try {
            const sujetUser = `Mise à jour de votre script : ${rubrique}`;
            const messageUser = `Bonjour,\n\nDes modifications ont été apportées à votre demande de validation pour ${rubrique}.\n\n`
                                + modifications.join("\n")
                                + `\n\nConsultez le document ici : ${sheetUrl}`
                                + `\n\nCordialement.`;

            GmailApp.sendEmail(emailUtilisateur, sujetUser, messageUser);
            Logger.log(`Email envoyé à l'utilisateur : ${emailUtilisateur}`);
        } catch (e) {
            Logger.log(`Erreur envoi email utilisateur : ${e.message}`);
        }
    }

    // Vérifie si le statut nécessite un envoi à un administrateur
    if (["Script (En) Disponible", "Conducteur en revue", "Script (En) en valider"].includes(status)) {
        try {
            const emailAdmin = "@gmail.com";
            const sujetAdmin = `Statut de validation du script : ${rubrique}`;
            const messageAdmin = `Bonjour,\n\nLe script pour ${rubrique} est en attente de validation pour la version anglaise.\n\n`
                                 + modifications.join("\n")
                                 + `\n\nMerci de procéder à la validation.`
                                 + `\n\nConsultez le document ici : ${sheetUrl}`;

            GmailApp.sendEmail(emailAdmin, sujetAdmin, messageAdmin);
            Logger.log("Email envoyé à @gmail.com");

            // Notifie également le demandeur que son script est en attente de validation anglaise
            const sujetUserValidation = `Votre script ${rubrique} est en attente de validation (version anglaise)`;
            const messageUserValidation = `Bonjour,\n\nVotre demande pour ${rubrique} est en attente de validation pour la version anglaise par @gmail.com.\n\n`
                                          + `Merci de patienter jusqu'à la validation.`
                                          + `\n\nConsultez le document ici : ${sheetUrl}`;

            GmailApp.sendEmail(emailUtilisateur, sujetUserValidation, messageUserValidation);
            Logger.log("Email envoyé à l'utilisateur pour la validation anglaise.");
        } catch (e) {
            Logger.log(`Erreur envoi email admin : ${e.message}`);
        }
    }

    // Indique la fin du traitement dans les journaux
    Logger.log("------ Fin du traitement ------");
}
