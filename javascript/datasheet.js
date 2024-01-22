let jsonData;
let armySelector = document.querySelector("#armySelector");
let datasheetsFactionContainer;

// Charger le fichier JSON et appeler la fonction avec les données
fetch('json/rules.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        createArmySelector(data);
    })
    .catch(error => console.error('Erreur lors de la récupération du fichier JSON :', error));

function createDatasheet(factionName) {

    if (datasheetsFactionContainer) {
        datasheetsFactionContainer.remove();
    }

    datasheetsFactionContainer = createHtmlElement('article', document.body, "datasheets-faction-container");

    let factionData = jsonData.factions[factionName];

    if (!factionData) {
        console.error(`Faction '${factionName}' not found in the JSON data.`);
        return;
    }

    let factionCombatPatrolUnits = factionData.factions_rules.combat_patrol.patrol_units;
    createHtmlElement('h2', datasheetsFactionContainer, undefined, undefined, `${factionName}`.toUpperCase())

    Object.keys(factionCombatPatrolUnits).forEach(units => {

        // Article
        const datasheetArticle = createHtmlElement('article', datasheetsFactionContainer, "datasheet");
        // Header
        const header = createHtmlElement('header', datasheetArticle);
        createHtmlElement('h3', header, "datasheet-name", undefined, units.toUpperCase());
        // Table
        const datasheetProfilesTable = createHtmlElement('table', header, 'datasheet-profiles');
        // Thead
        const datasheetProfilesTableThead = createHtmlElement('thead', datasheetProfilesTable, factionName.replace(/\s+/g, '-').replace(/'/g, ''));

        const datasheetProfilesTableTheadTr = createHtmlElement('tr', datasheetProfilesTableThead);
        let datasheetProfilesCharacteristics = jsonData.core_rules['profiles-characteristics'];
        Object.values(datasheetProfilesCharacteristics).forEach(characteristic => {
            createHtmlElement('th', datasheetProfilesTableTheadTr, undefined, undefined, characteristic);
        });

        // Tbody

        const datasheetProfilesTableTbody = createHtmlElement('tbody', datasheetProfilesTable);

        const datasheetProfilesTableTbodyTd = createHtmlElement('tr', datasheetProfilesTableTbody);

        const combatPatrolUnitsProfilesCharacteristics = factionCombatPatrolUnits[units].stats;
        Object.values(combatPatrolUnitsProfilesCharacteristics).forEach(characteristic => {
            createHtmlElement('td', datasheetProfilesTableTbodyTd, undefined, undefined, characteristic);
        });

        // Img

        createHtmlElement('img', header, "overlay", undefined, factionCombatPatrolUnits[units].img, units)

        // section description

        const DatasheetDescription = createHtmlElement('section', header, "datasheet-description")
        createHtmlElement('h4', DatasheetDescription, undefined, undefined, "Fiche Technique de Patrouille")

        const combatPatrolUnitsDescription = factionCombatPatrolUnits[units].description;
        createHtmlElement('p', DatasheetDescription, undefined, undefined, combatPatrolUnitsDescription)

        // FIN DU HEADER
        // DIV Other rules

        let datasheetOtherRules = createHtmlElement('div', datasheetArticle, "datasheet-other-rules")

        // Ranged WEAPONS

        if (factionCombatPatrolUnits[units].weapons && factionCombatPatrolUnits[units].weapons.ranged) {
            const datasheetRangedWeaponsTable = createHtmlElement('table', datasheetOtherRules, "datasheet-weapons");
            const datasheetRangedWeaponsThead = createHtmlElement('thead', datasheetRangedWeaponsTable, factionName.replace(/\s+/g, '-').replace(/'/g, ''));
            const datasheetRangedWeaponsTheadTr = createHtmlElement('tr', datasheetRangedWeaponsThead);

            const rangedWeaponData = factionCombatPatrolUnits[units].weapons.ranged;
            Object.keys(rangedWeaponData).forEach(weaponName => {
                const weapon = rangedWeaponData[weaponName];
                if (weapon && typeof weapon === 'object') {
                    if (!datasheetRangedWeaponsTheadTr.hasChildNodes()) {
                        // Only add th if the header row doesn't exist yet
                        const weaponColumns = Object.keys(weapon);
                        weaponColumns.forEach(column => {
                            createHtmlElement('th', datasheetRangedWeaponsTheadTr, undefined, undefined, column);
                        });
                    }

                    const datasheetRangedWeaponsTableTbody = createHtmlElement('tbody', datasheetRangedWeaponsTable);
                    const datasheetRangedWeaponsTableTbodyTr = createHtmlElement('tr', datasheetRangedWeaponsTableTbody);

                    Object.values(weapon).forEach(value => {
                        createHtmlElement('td', datasheetRangedWeaponsTableTbodyTr, undefined, undefined, value);
                    });
                }
            });
        }

        // Melee WEAPONS

        if (factionCombatPatrolUnits[units].weapons && factionCombatPatrolUnits[units].weapons.melee) {
            const datasheetMeleeWeaponsTable = createHtmlElement('table', datasheetOtherRules, "datasheet-weapons");
            const datasheetMeleeWeaponsThead = createHtmlElement('thead', datasheetMeleeWeaponsTable, factionName.replace(/\s+/g, '-').replace(/'/g, ''));
            const datasheetMeleeWeaponsTheadTr = createHtmlElement('tr', datasheetMeleeWeaponsThead);

            const meleeWeaponData = factionCombatPatrolUnits[units].weapons.melee;
            Object.keys(meleeWeaponData).forEach(weaponName => {
                const weapon = meleeWeaponData[weaponName];
                if (weapon && typeof weapon === 'object') {
                    if (!datasheetMeleeWeaponsTheadTr.hasChildNodes()) {
                        // Only add th if the header row doesn't exist yet
                        const weaponColumns = Object.keys(weapon);
                        weaponColumns.forEach(column => {
                            createHtmlElement('th', datasheetMeleeWeaponsTheadTr, undefined, undefined, column);
                        });
                    }

                    const datasheetMeleeWeaponsTableTbody = createHtmlElement('tbody', datasheetMeleeWeaponsTable);
                    const datasheetMeleeWeaponsTableTbodyTr = createHtmlElement('tr', datasheetMeleeWeaponsTableTbody);

                    Object.values(weapon).forEach(value => {
                        createHtmlElement('td', datasheetMeleeWeaponsTableTbodyTr, undefined, undefined, value);
                    });
                }
            });
        }

        // Wargear abilities
        if (factionCombatPatrolUnits[units].wargear_abilities) {
            let datasheetWargearAbilities = createHtmlElement('section', datasheetOtherRules, "datasheet-wargear-abilities");
            createHtmlElement('h4', datasheetWargearAbilities, factionName.replace(/\s+/g, '-').replace(/'/g, ''), undefined, "APTITUDES D'ÉQUIPEMENT");

            // Loop through each key in wargear_abilities
            Object.entries(factionCombatPatrolUnits[units].wargear_abilities).forEach(([key, value]) => {
                // Create a new paragraph for each key
                let datasheetWargearAbilitiesParagraph = createHtmlElement('p', datasheetWargearAbilities);

                // Create a span for the key
                createHtmlElement('span', datasheetWargearAbilitiesParagraph, undefined, undefined, `${key}: `);

                // Append the value to the paragraph
                datasheetWargearAbilitiesParagraph.appendChild(document.createTextNode(value));
            });
        }

        // LEADER
        if (factionCombatPatrolUnits[units].leader) {
            let datasheetLeader = createHtmlElement('section', datasheetOtherRules, "datasheet-leader");
            createHtmlElement('h4', datasheetLeader, factionName.replace(/\s+/g, '-').replace(/'/g, ''), undefined, "MENEUR");

            // Split the leader value into parts based on ':'
            let leaderParts = factionCombatPatrolUnits[units].leader.split(':');

            // Create a new paragraph for the leader
            let datasheetLeaderParagraph = createHtmlElement('p', datasheetLeader);

            // Append the first part (before ':') to the paragraph
            datasheetLeaderParagraph.appendChild(document.createTextNode(leaderParts[0] + ': '));

            // Create a span for the second part (after ':')
            createHtmlElement('span', datasheetLeaderParagraph, undefined, undefined, leaderParts[1]);
        }

        // TRANSPORT
        if (factionCombatPatrolUnits[units].transport) {
            let datasheetTransport = createHtmlElement('section', datasheetOtherRules, "datasheet-leader");
            createHtmlElement('h4', datasheetTransport, factionName.replace(/\s+/g, '-').replace(/'/g, ''), undefined, "TRANSPORT");

            let datasheetTransportParagraph = createHtmlElement('p', datasheetTransport);

            // Append the value to the paragraph
            datasheetTransportParagraph.appendChild(document.createTextNode(factionCombatPatrolUnits[units].transport));

        }

        // PATROL SQUAD
        if (factionCombatPatrolUnits[units].patrolSquad) {
            let datasheetPatrolSquad = createHtmlElement('section', datasheetOtherRules, "datasheet-patrol-squad");
            createHtmlElement('h4', datasheetPatrolSquad, factionName.replace(/\s+/g, '-').replace(/'/g, ''), undefined, "ESCOUADES DE PATROUILLE");

            let datasheetPatrolSquadParagraph = createHtmlElement('p', datasheetPatrolSquad);

            datasheetPatrolSquadParagraph.appendChild(document.createTextNode(factionCombatPatrolUnits[units].patrolSquad));

        }


        // DAMAGED
        if (factionCombatPatrolUnits[units].damaged) {
            let datasheetDamaged = createHtmlElement('section', datasheetOtherRules, "datasheet-damaged");
            createHtmlElement('h4', datasheetDamaged, factionName.replace(/\s+/g, '-').replace(/'/g, ''), undefined, "ENDOMMAGÉ : 1-4 PV RESTANTS");

            let datasheetDamagedParagraph = createHtmlElement('p', datasheetDamaged);

            datasheetDamagedParagraph.appendChild(document.createTextNode(factionCombatPatrolUnits[units].damaged));
        }


        // Abilities

        if (factionCombatPatrolUnits[units].abilities) {
            let datasheetAbilities = createHtmlElement('section', datasheetArticle, "datasheet-abilities");
            createHtmlElement('h4', datasheetAbilities, factionName.replace(/\s+/g, '-').replace(/'/g, ''), undefined, "APTITUDES");

            // Loop through each key in abilities
            Object.entries(factionCombatPatrolUnits[units].abilities).forEach(([key, value]) => {
                // Create a new paragraph for each key
                let datasheetAbilitiesParagraph = createHtmlElement('p', datasheetAbilities);

                // Create a span for the key
                createHtmlElement('span', datasheetAbilitiesParagraph, undefined, undefined, `${key}: `);

                // Append the value to the paragraph
                datasheetAbilitiesParagraph.appendChild(document.createTextNode(value));
            });
        }
        // Footer

        let datasheetFooter = createHtmlElement('footer', datasheetArticle);

        let datasheetKeywords = createHtmlElement('section', datasheetFooter, "datasheet-keywords");
        createHtmlElement('h4', datasheetKeywords, undefined, undefined, "MOTS-CLÉS:");
        createHtmlElement('p', datasheetKeywords, undefined, undefined, factionCombatPatrolUnits[units].keywords);

        createHtmlElement('img', datasheetFooter, undefined, undefined, factionData.factions_rules.combat_patrol.datasheetFooterLogo, `logo de l'armée ${factionName}`)

        let datasheetFactionKeywords = createHtmlElement('section', datasheetFooter, "datasheet-faction-keywords");
        createHtmlElement('h4', datasheetFactionKeywords, undefined, undefined, "MOTS-CLÉS DE FACTION:");
        createHtmlElement('p', datasheetFactionKeywords, undefined, undefined, factionCombatPatrolUnits[units].factions_keywords);

    })

}

// Fonction de création du selecteur d'armée
function createArmySelector(jsonData) {
    // Création de la balise form
    let armySelectorForm = createHtmlElement('form', armySelector, "army-selector-form");
    // Création de la balise select
    let armySelectorFormSelect = createHtmlElement('select', armySelectorForm);
    // Création d'une balise option par défaut
    createHtmlElement('option', armySelectorFormSelect, undefined, undefined, 'Sélectionnez votre faction', '');

    // Création d'une balise par faction
    Object.keys(jsonData.factions).forEach(factionName => {
        createHtmlElement('option', armySelectorFormSelect, undefined, undefined, factionName, factionName);
    });

    // Création d'un button submit
    createHtmlElement('button', armySelectorForm, undefined, undefined, 'Valider', 'submit', function (event) {
        // Empêcher le comportement par défaut du formulaire
        event.preventDefault();
        // Récupérer la valeur de l'option sélectionnée
        let selectedFaction = armySelectorFormSelect.value;
        // Appeler la fonction pour créer les datasheets
        createDatasheet(selectedFaction);
        // Faire un scroll pour arriver sur la première datasheet
        datasheetsFactionContainer.scrollIntoView({ behavior: 'smooth' });
    });
}




