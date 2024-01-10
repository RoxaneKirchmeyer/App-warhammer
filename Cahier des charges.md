# Cahier des charges des fonctionnalités - Application d'aide au jeu Warhammer 40,000

## Objectifs

L'objectif de cette application est de permettre aux utilisateurs de gérer efficacement leurs rounds de bataille, en recevant des annonces des évènements à résoudre en fonction de leurs liste d'armée et de leurs format de jeu. 
Une fonctionnalité de lancer de dés permet d'effectuer le suivi de la bataille grâce à un compteur de points des différents objectifs de jeu (Point de Commandement, Point d'Objectif, Points de Victoire, etc...).
Des fonctionnalités de création de liste d'armées et d'historique des parties jouées sont accessibles dans un espace personnel, ainsi que la possibilité d'ajouter des amis et de les rejoindre dans un salon de jeu afin d’accéder simultanément à la même partie.

## Fonctionnalités principales

    
### Suivi des rounds de bataille

#### Les utilisateurs disposent d'un suivi des évènements qui se déroule à chacun de leurs tours et phases de jeu. 

* À chaque début de phase de l'un de leurs tours, les différents événements disponibles durant cette phase sont signalés à l'utilisateur, et un simulateur de lancer de dés est à disposition afin de les résoudre. 

* Les résultats des dés sont conservés et archivés dans l'historique de la partie et consultable depuis l'espace personnel. Un compteur des différents points est également disponible à tout moment dans l'en-tête de l'application quand la partie est en cours.

* Dans le cas où l'utilisateur souhaite lancer physiquement les dés, une option pour sauvegarder dans l'application les résultats est également disponible pour assurer le suivi et l'archivage de la partie. 

* Une fonctionnalité permet à l'utilisateur de choisir ses propres unités et figurines, ainsi que de sélectionner leurs cibles, en rappelant les aptitudes spécifiques associées.

* Lorsque ce n'est pas le tour de l'utilisateur, un résumé des stratagèmes utilisables à chacune des phases est consultable.

### Espace personnel

#### Les utilisateurs ont à leur disposition un espace personnel où se trouve les règles de base et celles spécifiques aux différentes armées du jeu. Ils doivent également enregistrer leurs liste d’armée avant de pouvoir lancer une partie et d’en conserver l’historique.

* Un lexique des règles est disponible à tout moment dans l’en-tête de l’application ; il est accompagné d’une barre de recherche pour des mots-clé spécifiques.

* Pour pouvoir lancer une partie, l’utilisateur doit enregistrer obligatoirement sa liste d’armée afin d’en assurer le suivi.

* L’utilisateur a la possibilité d’ajouter ses listes d’armée dans ses favoris, qui seront visibles en premier.

* L’historique est disponible dans cet espace avec des statistiques selon ses différentes parties pour chaque liste d’armée.

### Exigences techniques

* L'application doit être développée en utilisant les technologies suivantes : HTML, CSS, JavaScript, et un framework de développement web (par exemple, React, Angular, Vue.js). Les données doivent être stockées dans une base de données relationnelle (par exemple, MySQL) ou une base de données NoSQL (par exemple, MongoDB).

* L'application doit suivre les meilleures pratiques de sécurité web, y compris la protection contre les attaques courantes telles que les injections SQL et les failles XSS. Les mots de passe des utilisateurs doivent être stockés de manière sécurisée (par exemple, en utilisant le hachage et le salage).

* L'application doit être optimisée pour des temps de chargement rapides et une utilisation efficace des ressources.

* L'application doit avoir une interface utilisateur responsive pour s'adapter à différents dispositifs (ordinateurs de bureau, tablettes, smartphones). L'expérience utilisateur doit être fluide et intuitive.
