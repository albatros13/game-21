import {Hand} from './Hand.js';
import {Command} from './Command';

export class Player{
    /**
     * Creates a player
     * @param name
     */
    constructor(name){
        this.name = name;
        this.reset();
    }

    /**
     * Defines whether the player is ready (finished or lost the game)
     * @returns {boolean}
     */
    get isReady(){
        return this.hands.filter(h => !h.isReady).length === 0;
    }

    /**
     * Defines whether the player is bust (lost the game)
     * @returns {boolean}
     */
    get isBust(){
        return this.hands.filter(h => h.isBust).length===this.hands.length;
    }

    /**
     * Defines whether the player is stand (finished the game)
     * @returns {boolean}
     */
    get isStand(){
        return this.hands.filter(h => h.isStand).length > 0;
    }

    /**
     * PLayer's best score in the game among all hands
     * @returns {*}
     */
    getScore(){
        return this.hands.map(h => h.getScore()).filter(a => a <= 21).reduce((a, b) => Math.max(a,b), 0);
    }

    /**
     * Clean player's hands for a new game
     * @param options
     */
    reset(){
        this.hands = [new Hand()];
    }

    /**
     * Property that provides address of this object
     * @returns {{id: *, class}}
     */
    get address(){
        return {id: this.id, class: this.constructor.name};
    }

    /**
     * Add a new hand to this player
     * @param hand
     */
    addHand(hand){
        this.hands.push(hand);
    }

     /**
     * Split a given hand
     * @param hand - a hand to split
     */
    split(hand){
        let card = hand.removeLastCard();
        //hand.commands contains ...Hit, Hit, Split
        hand.removeLastCommand();
        hand.removeLastCommand();
        //now hand.commands contains only ...Hit and can be split again if third card with the same value is received
        let newHand = new Hand({index: this.hands.length, parentHand: hand, parentIndex: hand.cards.length - 1});
        newHand.addCard(card);
        newHand.addCommand(Command.INITIAL); //new hand commands contains Initial
        this.addHand(newHand);
    }

    /**
     * JSON object to store essential properties of the current object
     * @returns {{id: *, class, name: *, hands: Array}}
     */
    toJSON() {
        return {
            id   : this.id,
            class: this.constructor.name,
            name : this.name,
            hands: this.hands.map(x => x.toJSON()),
        };
    }
}

