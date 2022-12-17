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

const gagner = () => `Le joueur ${joueurActuel} a gagné !`
const egalite = () => `Egalité !`
const tourJoueur = () => `C'est au tour du joueur ${joueurActuel}`

const verifierGagnant = () => {
    let winner = null
    conditionsVictoire.forEach(condition => {
        const valeur0 = etatJeu[condition[0]]
        const valeur1 = etatJeu[condition[1]]
        const valeur2 = etatJeu[condition[2]]
        if (valeur0 !== "" || valeur1 !== "" || valeur2 !== "") {
            if (
                valeur0 === valeur1 && valeur1 === valeur2) {
                winner = valeur0
            }
        }
    })
    return winner
}

const handleCellClick = (e) => {
    const index = e.target.id.split("-")[1]
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

const handleRestartGame = () => {
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    joueurActuel = "X"
    tour = 0
    gagnant = null
    messageDom.innerText = tourJoueur()
    cells.forEach(cell => cell.innerText = "")
}


document.addEventListener('DOMContentLoaded', () => {
    messageDom = document.querySelector('#message')
    cells = document.querySelectorAll('.case')
    recommencerDOM = document.querySelector('#rejouer')



    messageDom.innerText = tourJoueur()
    cells.forEach(
        cell => cell.addEventListener('click', handleCellClick)
    )

    recommencerDOM.addEventListener('click', handleRestartGame)

})
