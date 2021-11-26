const SUITS = ["♣","♦","♥","♠"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards        
    }

    get numberOfCards() {
        return this.cards.length
    }
    
    shuffle(){
        for (let i = this.numberOfCards - 1; i > 0; i--){
            //create random index
            const newIndex = Math.floor(Math.random() * (i + 1))
            //swap current card with new card
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            //sets new current
            this.cards[i] = oldValue
        }
    }

    pop() {
        return this.cards.shift()
    }
    push(card) {
        this.cards.push(card)
    }
}
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color() {
        return this.suit === "♦" || this.suit === "♥" ? 'red' : 'black'
    }

    getHTML() {
        //create new div
        const cardDiv = document.createElement('div')
        //add inner text (big central suit symbol)
        cardDiv.innerText = this.suit
        //add class of card and class of color red/black to that div
        cardDiv.classList.add('card', this.color)
        //pass data value for before and after => data-value="9 ♥">
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}

//gives (52) [{suit:'♣',value:'A'}, {suit:'♣',value:'2'}]
function freshDeck() {
    //flatmap turns [[Card, Card],[],[],[]] to one []
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}