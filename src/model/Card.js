export const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
export const suits  = ['♣', '♦', '♥', '♠'];
const colors = { '♣': 'black', '♦': 'red', '♥': 'red', '♠': 'black' };
const codes  = { '♠': '\u2660', '♦': '\u2666', '♥': '\u2665', '♣': '\u2663'};

/**
 * A class that models a playing card
 */
export class Card {
    constructor(value, suit) {
        this.face  = value + codes[suit];
        this.value = value;
        this.suit  = suit;
        this.color = colors[suit];
    }

    /**
     * Provides game score for each card
     * @returns {*}
     */
    get score() {
        switch (this.value) {
            case 'A'  :
                return 11;
            case 'K' :
                return 3;
            case 'Q':
                return 2;
            case 'J' :
                return 1;
            default:
                return this.value;
        }
    }

    /**
     * JSON object to store essential properties of the current object
     * @returns {{value: *, suit: *, class}}
     */
    toJSON(){
        return {
            value: this.value,
            suit: this.suit,
            class: this.constructor.name
        }
    }

    /**
     * Print card face in right color
     * @returns {string} HTML span tag with card face
     */
    get html(){
        return '<span style="color: ' + this.color + '">' + this.face + '</span>';
    }
}


