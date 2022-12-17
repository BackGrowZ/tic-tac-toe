// tic tac toe game

let etatJeu = ["", "", "", "", "", "", "", "", ""]

// elements du DOM
let messageDom = null
let cells = null
let recommencerDOM = null

let jeuActif = true
let joueurActuel = "X"
let gagnant = null
let tour = 0

const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/**
 * 
 * @return {string} message avec le nom du vainqueur
 */
const gagner = () => `Le joueur ${joueurActuel} a gagné !`

/**
 * 
 * @return {string} message d'egalité
 */
const egalite = () => `Egalité !`

/**
 * 
 * @return {string} 
 */
const tourJoueur = () => `C'est au tour du joueur ${joueurActuel}`

/**
 * verrifie si l'un des joueurs a gagner
 * @return {string} message avec le nom du vainqueur
 */
const verifierGagnant = () => {
    let winner = null
    // on boucle sur les cas possible de victoire pour voir un des cas est remplit 
    conditionsVictoire.forEach(condition => {
        // valeur des cases qui doivent avoir la meme valeur pour gagner
        const valeur0 = etatJeu[condition[0]]
        const valeur1 = etatJeu[condition[1]]
        const valeur2 = etatJeu[condition[2]]

        // on verrifie que les cases ne soit pas vide et quelle est la meme valeur (X ou O)  
        if (valeur0 !== "" || valeur1 !== "" || valeur2 !== "") {
            if (valeur0 === valeur1 && valeur1 === valeur2) {
                // on dit qui est le vainqueur (X ou O)
                winner = valeur0
            }
        }
    })
    return winner
}

/**
 * Action lorsque que l'utilisateur a cliquer sur un case
 * @param {Element} 
 */
const handleCellClick = (e) => {
    // on recupere le numero de case dans l'id (model id case-0)
    const index = e.target.id.split("-")[1]
    // on empeche le jeu si les conditions ne sont pas OK
    if (etatJeu[index] !== "" || gagnant || !jeuActif) {
        return
    }
    etatJeu[index] = joueurActuel
    e.target.innerText = joueurActuel
    tour++
    gagnant = verifierGagnant()
    if (gagnant) {
        messageDom.innerText = gagner()
        return
    }
    if (tour === 9) {
        messageDom.innerText = egalite()
        return
    }
    joueurActuel = joueurActuel === "X" ? "O" : "X"
    messageDom.innerText = tourJoueur()
}

/**
 * Reinitialise les valeurs
 * 
 */
const handleRestartGame = () => {
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    joueurActuel = "X"
    tour = 0
    gagnant = null
    messageDom.innerText = tourJoueur()
    cells.forEach(cell => cell.innerText = "")
}


/**
 * Action a exectuer une fois que le DOM est charger
 * 
 */
const DOMLoaded = () => {
    // DOM Element
    messageDom = document.querySelector('#message')
    cells = document.querySelectorAll('.case')
    recommencerDOM = document.querySelector('#rejouer')

    // Message d'indication
    messageDom.innerText = tourJoueur()

    // ajout des onClick sur les cases
    cells.forEach(cell => cell.addEventListener('click', handleCellClick))

    // ajout du onClick sur le bouton rejouer
    recommencerDOM.addEventListener('click', handleRestartGame)
}

document.addEventListener('DOMContentLoaded', DOMLoaded)
