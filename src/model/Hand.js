import {Command} from './Command';
import {BankHand} from './BankHand';

export class Hand extends BankHand{
    /**
     * Create a new hand
     */
    constructor(options = {}){
        super();
        this.parentHand  = options.parentHand;
        this.parentIndex = options.parentIndex;
        this.index       = (options.index)? options.index: 0;
    }

    /**
     * Indicates whether a player can split the hand
     * @returns {boolean}
     */
    get canSplit(){
        let n = this.cards.length;
        return !this.isReady && ((n >= 2) && this.cards[n - 1].value === this.cards[n - 2].value);
    }

    /**
     * Indicates whether the current hand is allowed to hit
     * @returns {boolean}
     */
    get canHit(){
        return !this.isReady && (this.cards.length > 0);
    }

    /**
     * Indicates whether the current hand is allowed to stand (the game has started and the player is not ready)
     * @returns {boolean}
     */
    get canStand(){
        return !this.isReady && (this.cards.length > 0);
    }

    /**
     * Indicates whether the hand must stand
     * @returns {boolean}
     */
    get mustStand(){
        return false;
    }

    /**
     * Indicates whether the hand must hit
     * @returns {boolean}
     */
    get mustHit(){
        return false;
    }

    /**
     * Compute overall score as sum of all cards in the hand
     * @param lastIndex - indicates the index in the parent hand before splitting
     * @returns {number} hand score
     */
    getScore(lastIndex = -1) {
        let score = 0;
        if (this.parentHand){
            score += this.parentHand.getScore(this.parentIndex);
        }

        let tail = (lastIndex >= 0)? this.cards.slice(0, lastIndex): this.cards;
        score += tail.reduce((score, card) => score + card.score, 0);

        // Reduce each Ace score from 11 to 1 if necessary
        tail.filter(c => c.value === 'A').forEach(c => {
            if (score > 21) { score -= 10; }
        });

        return score;
    }

    /**
     * Register stand command
     */
    stand(){
        this.addCommand(Command.STAND);
    }

    /**
     * Remove last card from the card stack
     * @returns {*}
     */
    removeLastCard(){
        return this.cards.pop();
    }

    /**
     * Remove last command from teh command stack
     * @returns {*}
     */
    removeLastCommand(){
        return this.commands.pop();
    }

    /**
     * JSON object to store essential properties of the current object
     */
    toJSON(){
        let obj = super.toJSON();
        obj.parentHand  = this.parentHand? this.parentHand.toJSON(): null;
        obj.parentIndex = this.parentIndex;
        obj.class       = this.constructor.name;
        obj.index       = this.index;
        return obj;
    }

}