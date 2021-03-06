import Deck from "./deck.js"

const cardValueMap = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

let playerDeck, computerDeck, inRound

document.addEventListener('click', () => {
    if(inRound) {
        cleanBeforeRound()
    } else {
        flipCards()
    }
})

startGame()
function startGame(params) {
    
    const deck = new Deck()
    deck.shuffle()
    
    const deckMidPoint = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0, deckMidPoint))
    computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards))
    inRound = false


    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    text.innerHTML = ""
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""

    updateDeckCount()
}
function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)){
        text.innerText = 'Win'
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = 'Lose'
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        text.innerText = 'Draw'
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }
}


function updateDeckCount() {
    computerDeckElement.innerHTML = computerDeck.numberOfCards
    playerDeckElement.innerHTML = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    return cardValueMap[cardOne.value] > cardValueMap[cardTwo.value]

}