// Liste des questions (10 questions) - données brutes
const questionsData = [
    {
        question: "Dans le formulaire d’enquête, quel champ doit être rempli automatiquement par l’application sans que l’enquêteur ait à le saisir ?",
        options: [
            "Le nom du responsable de ménage",
            "Le village",
            "La géolocalisation (geopoint)",
            "La taille du ménage"
        ],
        correct: 2 // index 0-based
    },
    {
        question: "Dans la chefferie de BANGENGELE, vous êtes dans le village TMPOM (zone tampon du Parc National de Lomami). Quelle est la première information à vérifier avant de commencer l’enquête ?",
        options: [
            "Le nombre d’enfants dans le ménage",
            "Le nom du groupement et du village correspondent bien à la liste déroulante",
            "La superficie des champs",
            "Le type d’élevage pratiqué"
        ],
        correct: 1
    },
    {
        question: "Dans le champ « cultures », plusieurs options sont possibles. Cela signifie que l’enquêteur peut :",
        options: [
            "Ne choisir qu’une seule culture",
            "Choisir plusieurs cultures pratiquées par le ménage",
            "Ajouter une culture non listée sans la noter",
            "Laisser vide si le ménage ne cultive rien"
        ],
        correct: 1
    },
    {
        question: "Un ménage déclare élever des chèvres, des poulets et des lapins. Comment devez-vous enregistrer cette information dans le formulaire ?",
        options: [
            "Cocher uniquement « chèvre »",
            "Cocher « chèvre », « poulet » et « lapin » dans la liste « elevage »",
            "Noter dans « autres_elevage »",
            "Ne rien cocher car ce n’est pas dans la liste"
        ],
        correct: 1
    },
    {
        question: "Dans le champ « agroforesterie », quelle est la bonne attitude si le ménage cite un arbre qui ne figure pas dans la liste ?",
        options: [
            "Ignorer la réponse",
            "Cocher « autres espèces » et noter le nom en clair si possible",
            "Choisir l’espèce la plus proche dans la liste",
            "Ne pas enregistrer cette information"
        ],
        correct: 1
    },
    {
        question: "Pour le champ « apiculture », un ménage vous dit qu’il pratique l’apiculture traditionnelle. Que devez-vous sélectionner ?",
        options: [
            "Oui",
            "Non",
            "Autres",
            "Ne pas répondre"
        ],
        correct: 0
    },
    {
        question: "La « taille du ménage » est un champ de type `integer` avec une contrainte `.>0`. Cela signifie que :",
        options: [
            "On peut mettre 0 si la personne vit seule",
            "On peut mettre n’importe quel nombre",
            "Le nombre doit être supérieur à 0",
            "On peut mettre des lettres"
        ],
        correct: 2
    },
    {
        question: "Vous devez prendre une photo du ménage. Le champ `photo_menage` est marqué « no » dans la colonne `required`. Cela veut dire que :",
        options: [
            "La photo est obligatoire",
            "La photo est facultative",
            "La photo doit être prise après l’enquête",
            "La photo ne peut pas être prise"
        ],
        correct: 1
    },
    {
        question: "Dans la liste des villages, vous ne trouvez pas « TMPOM » alors que vous êtes dans ce village. Que faites-vous ?",
        options: [
            "Je choisis le village le plus proche",
            "Je contacte le superviseur (Ir. AWAZI RAMAZANI Guillaume) pour signaler l’absence",
            "Je laisse le champ vide",
            "Je note le nom dans la marge du carnet de terrain"
        ],
        correct: 1
    },
    {
        question: "Pourquoi est-il important d’enregistrer la géolocalisation du ménage dans cette zone proche du Parc National de Lomami ?",
        options: [
            "Pour connaître la superficie du village",
            "Pour suivre la répartition des ménages et éviter les doublons",
            "Pour mesurer la distance entre les maisons",
            "Pour savoir quel ménage a le plus d’enfants"
        ],
        correct: 1
    }
];