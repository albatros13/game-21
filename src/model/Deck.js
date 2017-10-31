import {suits, values, Card} from './Card.js';

/**
 * A class that models a deck of cards
 */
export class Deck{
    /**
     * Create a new deck
     * @param index - card deck index (relevant for games with many decks)
     */
    constructor(){
        this.index = 0;
        this.reset();
    }

    /**
     * Instantiate a new shuffled deck
     */
    reset(shuffle = true){
        this.cards = [];
        for (var i = 0; i <= 12; i++) {
            for (var j = 0; j <= 3; j++) {
                let card = new Card(values[i], suits[j]);
                this.cards.push(card);
            }
        }
        if (shuffle){ this.shuffle(); }
        this.dealtIndex = 0;
    }

    /**
     * Shuffle the deck
     */
    shuffle(){
        for (var i = 0; i < this.cards.length; i++){
            let r = i + Math.floor(Math.random() * (this.cards.length - i));
            let swap = this.cards[i];
            this.cards[i] = this.cards[r];
            this.cards[r] = swap;
        }
    }

    /**
     * Deal a card from the current deck
     * @returns {Card}
     */
    dealCard(){
        if (this.dealtIndex < this.cards.length){
            let card = this.cards[this.dealtIndex];
            this.dealtIndex++;
          return card;
        }
        return null;
    }

    /**
     * Print cards in the deck in the right color
     * @returns {string}
     */
    get htmlCards(){
        return this.cards.map(x => x.html).join(", ");
    }

    /**
     * Print dealt cards in the right color
     * @returns {string}
     */
    get htmlDealtCards(){
        return this.cards.slice(0,this.dealtIndex).map(x => x.html).join(", ");
    }

    /**
     * JSON object to store essential properties of the current object
     * @returns {{index: *, class, cards: Array, dealtIndex: number}}
     */
    toJSON(){
        return {
            index: this.index,
            class: this.constructor.name,
            cards: this.cards.map(x => x.toJSON()),
            dealtIndex: this.dealtIndex
        }
    }
}
