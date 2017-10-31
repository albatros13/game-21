import {Command} from './Command';

export class BankHand{
    /**
     * Create a new bank hand
     */
    constructor(options = {}){
        this.commands = [];
        this.cards = [];
    }

    /**
     * determines whether the hand is bust
     * @returns {boolean}
     */
    get isBust() {
        return this.getScore() > 21;
    }

    /**
     * Determines whether the current hand is ready
     * @returns {boolean|*}
     */
    get isReady(){
        return this.isBust || this.isStand;
    }

    /**
     * Determines whether the current hand is stand
     * @returns {boolean}
     */
    get isStand(){
        return ((this.commands.length > 0) && this.commands[this.commands.length - 1] === Command.STAND);
    }

    /**
     * Indicates whether the bank hand must stand
     * @returns {boolean}
     */
    get mustStand(){
        return this.getScore() >= 17;
    }

    /**
     * Indicates whether the bank hand must hit
     * @returns {boolean}
     */
    get mustHit(){
        return this.getScore() < 17;
    }

    /**
     * Prints cards in the hand in the right color
     * @returns {string}
     */
    get htmlCards(){
        return this.cards.map(x => x.html).join(", ");
    }

    /**
     * Add card to the hand
     * @param card
     */
    addCard(card){
        this.cards.push(card);
    }

    /**
     * Registers a command (hit, stand or split) on the hand
     * @param command
     */
    addCommand(command){
        this.commands.push(command);
    }

    /**
     * Compute overall score as sum of all cards in the hand
     * @returns {number} hand score
     */
    getScore() {
        let score = this.cards.reduce((score, card) => score + card.score, 0);
        // Reduce each Ace score from 11 to 1 if necessary
        this.cards.filter(c => c.value === 'A').forEach(c => { if (score > 21) { score -= 10; }});
        return score;
    }

    /**
     * JSON object to store essential properties of the current object
     * @returns {{index: *, commands: Array, cards: Array, class}}
     */
    toJSON(){
        return {
            index       : this.index,
            commands    : this.commands,
            cards       : this.cards.map(x => x.toJSON()),
            class       : this.constructor.name
        }
    }
}