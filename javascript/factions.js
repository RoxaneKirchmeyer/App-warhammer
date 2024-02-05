let jsonData;

const factionArticle = document.querySelector("#factions");

fetch('/json/rules.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        
        // Utilisez Object.keys(jsonData.factions) pour obtenir les noms de faction
        Object.keys(jsonData.factions).forEach(factionName => {
            // Accédez aux données de chaque faction
            let factionData = jsonData.factions[factionName];
            
            // Utilisez factionName à la place de faction dans la création de l'élément img
            createHtmlElement('img', factionArticle, undefined, undefined, `/${factionData.factions_rules.combat_patrol.factionLogo}`, `logo de l'armée ${factionName}`);
        });
        
    })
    .catch(error => console.error('Erreur lors de la récupération du fichier JSON :', error));
