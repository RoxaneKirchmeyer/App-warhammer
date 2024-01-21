// Fonction générique pour créer des éléments HTML dynamiquement
function createHtmlElement(type, parent, className, id, contenu, attribute, event) {
    // Permet de créer un élément HTML en fonction du paramètre type
    let htmlElement = document.createElement(type);
    parent.appendChild(htmlElement);
    if (className !== undefined) {
        htmlElement.className = className;
    }

    if (id !== undefined) {
        htmlElement.id = id;
    }

    if (type === 'option') {
        htmlElement.value = attribute
    }
    // Permet d'ajouter du contenu à cet élément HTML en fonction du paramètre contenu
    // Si on a créé un élément HTML de type p ou h3 : on change le contenu de la balise en fonction du paramètre contenu

    // Si on a créé un élément HTML de type img : on ajoute une source d'image en fonction du paramètre contenu
    if (type === 'img') {
        htmlElement.src = contenu;
        htmlElement.alt = attribute
    }

    // Si le paramètre event correspond bien à une fonction :
    if (type === 'button') {
        // Ajouter un écouteur d'évènement
        htmlElement.textContent = contenu;
        htmlElement.type = attribute
        htmlElement.addEventListener('click', event);
    }

    else {
        htmlElement.textContent = contenu;
    }

    // On retourne la variable htmlElement afin de pouvoir l'utiliser en dehors de la fonction createHtmlElement
    return htmlElement;
}