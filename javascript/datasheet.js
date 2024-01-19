// Fonction générique pour créer des éléments HTML dynamiquement
function createHtmlElement(type, parent, className, id, contenu, event) {
    // Permet de créer un élément HTML en fonction du paramètre type
    let htmlElement = document.createElement(type);
    parent.appendChild(htmlElement);
    if (className !== undefined) {
        htmlElement.className = className;
    }

    if (id !== undefined) {
        htmlElement.id = id;
    }

    // Permet d'ajouter du contenu à cet élément HTML en fonction du paramètre contenu
    // Si on a créé un élément HTML de type p ou h2 : on change le contenu de la balise en fonction du paramètre contenu

    // Si on a créé un élément HTML de type img : on ajoute une source d'image en fonction du paramètre contenu
    if (type === 'img') {
        htmlElement.src = contenu;
        htmlElement.alt = event
    }

    // Si le paramètre event correspond bien à une fonction :
    if (type === 'button') {
        // Ajouter un écouteur d'évènement
        htmlElement.textContent = contenu;
        htmlElement.addEventListener('click', event);
    } else {
        htmlElement.textContent = contenu;
    }

    // On retourne la variable htmlElement afin de pouvoir l'utiliser en dehors de la fonction createHtmlElement
    return htmlElement;
}

function createDatasheet(factionName) {
    fetch('rules.json')
        .then(response => response.json())
        .then(data => {

            let factionData = data.factions[factionName];

            if (!factionData) {
                console.error(`Faction '${factionName}' not found in the JSON data.`);
                return;
            }

            let factionCombatPatrolUnits = factionData.factions_rules.combat_patrol.patrol_units;



            Object.keys(factionCombatPatrolUnits).forEach(units => {
                // Article
                const datasheetArticle = createHtmlElement('article', document.body, "datasheet");
                // Header
                const header = createHtmlElement('header', datasheetArticle);
                createHtmlElement('h2', header, "datasheet-name", undefined, units.toUpperCase());
                // Table
                const datasheetProfilesTable = createHtmlElement('table', header, 'datasheet-profiles');
                // Thead
                const datasheetProfilesTableThead = createHtmlElement('thead', datasheetProfilesTable);

                const datasheetProfilesTableTheadTr = createHtmlElement('tr', datasheetProfilesTableThead);
                let datasheetProfilesCharacteristics = data.core_rules['profiles-characteristics'];
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

                createHtmlElement('img', header, "overlay", undefined, ".jpg", units)

                // section description

                const DatasheetDescription = createHtmlElement('section', header, "datasheet-description")
                createHtmlElement('h3', DatasheetDescription, undefined, undefined, "Fiche Technique de Patrouille")

                const combatPatrolUnitsDescription = factionCombatPatrolUnits[units].description;
                createHtmlElement('p', DatasheetDescription, undefined, undefined, combatPatrolUnitsDescription)

                // FIN DU HEADER
                // DIV Other rules

                let datasheetOtherRules = createHtmlElement('div', datasheetArticle, "datasheet-other-rules")

                // Ranged WEAPONS

                if (factionCombatPatrolUnits[units].weapons && factionCombatPatrolUnits[units].weapons.ranged) {
                    const datasheetRangedWeaponsTable = createHtmlElement('table', datasheetOtherRules, "datasheet-ranged-weapons");
                    const datasheetRangedWeaponsThead = createHtmlElement('thead', datasheetRangedWeaponsTable, "datasheet-ranged-weapons");
                    const datasheetRangedWeaponsTheadTr = createHtmlElement('tr', datasheetRangedWeaponsThead, "datasheet-ranged-weapons");

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
                    const datasheetMeleeWeaponsTable = createHtmlElement('table', datasheetOtherRules, "datasheet-melee-weapons");
                    const datasheetMeleeWeaponsThead = createHtmlElement('thead', datasheetMeleeWeaponsTable, "datasheet-melee-weapons");
                    const datasheetMeleeWeaponsTheadTr = createHtmlElement('tr', datasheetMeleeWeaponsThead, "datasheet-melee-weapons");

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
                    createHtmlElement('h3', datasheetWargearAbilities, undefined, undefined, "APTITUDES D'ÉQUIPEMENT");

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
                    createHtmlElement('h3', datasheetLeader, undefined, undefined, "MENEUR");

                    // Loop through each key in wargear_abilities
                    Object.entries(factionCombatPatrolUnits[units].leader).forEach(([key, value]) => {
                        // Create a new paragraph for each key
                        let datasheetLeaderParagraph = createHtmlElement('p', datasheetLeader);

                        // Create a span for the key
                        createHtmlElement('span', datasheetLeaderParagraph, undefined, undefined, `${key}:BUGGG A VOIR `);

                        // Append the value to the paragraph
                        datasheetLeaderParagraph.appendChild(document.createTextNode(value));
                    });
                }

                // TRANSPORT
                if (factionCombatPatrolUnits[units].transport) {
                    let datasheetTransport = createHtmlElement('section', datasheetOtherRules, "datasheet-leader");
                    createHtmlElement('h3', datasheetTransport, undefined, undefined, "TRANSPORT");

                    // Loop through each key in wargear_abilities
                    Object.entries(factionCombatPatrolUnits[units].transport).forEach(([key, value]) => {
                        // Create a new paragraph for each key
                        let datasheetTransportParagraph = createHtmlElement('p', datasheetTransport);

                        // Create a span for the key
                        createHtmlElement('span', datasheetTransportParagraph, undefined, undefined, `${key}: `);

                        // Append the value to the paragraph
                        datasheetTransportParagraph.appendChild(document.createTextNode(value));
                    });
                }

                // PATROL SQUAD
                if (factionCombatPatrolUnits[units].patrolSquad) {
                    let datasheetPatrolSquad = createHtmlElement('section', datasheetOtherRules, "datasheet-patrol-squad");
                    createHtmlElement('h3', datasheetPatrolSquad, undefined, undefined, "ESCOUADES DE PATROUILLE");

                    // Loop through each key in wargear_abilities
                    Object.entries(factionCombatPatrolUnits[units].patrolSquad).forEach(([key, value]) => {
                        // Create a new paragraph for each key
                        let datasheetPatrolSquadParagraph = createHtmlElement('p', datasheetPatrolSquad);

                        // Create a span for the key
                        createHtmlElement('span', datasheetPatrolSquadParagraph, undefined, undefined, `${key}: `);

                        // Append the value to the paragraph
                        datasheetPatrolSquadParagraph.appendChild(document.createTextNode(value));
                    });
                }


                // DAMAGED
                if (factionCombatPatrolUnits[units].damaged) {
                    let datasheetDamaged = createHtmlElement('section', datasheetOtherRules, "datasheet-damaged");
                    createHtmlElement('h3', datasheetDamaged, undefined, undefined, "ENDOMMAGÉ : 1-4 PV RESTANTS");

                    // Loop through each key in wargear_abilities
                    Object.entries(factionCombatPatrolUnits[units].damaged).forEach(([key, value]) => {
                        // Create a new paragraph for each key
                        let datasheetDamagedParagraph = createHtmlElement('p', datasheetDamaged, undefined, undefined, value);
                    });
                }


                // Abilities

                if (factionCombatPatrolUnits[units].abilities) {
                    let datasheetAbilities = createHtmlElement('section', datasheetArticle, "datasheet-abilities");
                    createHtmlElement('h3', datasheetAbilities, undefined, undefined, "APTITUDES");

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
                createHtmlElement('h3', datasheetKeywords, undefined, undefined, "MOTS-CLÉS:");

                // Loop through each key in abilities
                Object.entries(factionCombatPatrolUnits[units].kewords).forEach(([key, value]) => {
                    // Create a new paragraph for each key
                    createHtmlElement('p', datasheetKeywords, undefined, undefined, value);

                });

                createHtmlElement('img', datasheetFooter, undefined, undefined, "footerLogo.jpg", "logo de l'armée: X")

                
                let datasheetFactionKeywords = createHtmlElement('section', datasheetFooter, "datasheet-faction-keywords");
                createHtmlElement('h3', datasheetFactionKeywords, undefined, undefined, "MOTS-CLÉS DE FACTION:");

                // Loop through each key in abilities
                Object.entries(factionCombatPatrolUnits[units].kewords).forEach(([key, value]) => {
                    // Create a new paragraph for each key
                    createHtmlElement('p', datasheetFactionKeywords, undefined, undefined, value);

                });
            });
        })
        .catch(error => console.error('Erreur lors de la récupération du fichier JSON :', error));
}

// Appeler la fonction createDatasheet pour générer la datasheet
createDatasheet('empireTau');

