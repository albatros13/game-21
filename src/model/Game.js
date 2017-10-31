import {Deck} from './Deck.js';
import {BankHand} from './BankHand.js';
import {uniqueId} from 'lodash-bound';
import {Command} from './Command';

export class Game{
    /**
     * Create new game
     */
    constructor(){
        this.id   = 1; //uniqueId(); //for many games
        this.deck = new Deck();
        this.bank = new BankHand();
        this.players = [];
    }

    /**
     * Add a player to the game
     * @param player
     */
    addPlayer(player) {
        if (this.players.length >= 3) {
            throw new Error("Too many players per deck!");
        }
        player.id = uniqueId();
        player.game = this.id; //A player may need to know which games he/she plays
        this.players.push(player);
    }

    /**
     * Reset all fields to restart the game
     */
    reset(){
        this.deck.reset();
        this.bank = new BankHand();
        for (let player of this.players){
            player.reset();
        }
    }

    /**
     * Deal cards to all players
     */
    dealInitial(){
        if (!this.isNew){ this.reset(); }
        for (let player of this.players){
            let card = this.deck.dealCard();
            player.hands[0].addCard(card);
            player.hands[0].addCommand(Command.INITIAL);
        }
    }

    /**
     * Deal a card (on request)
     * @returns {Card}
     */
    dealCard(){
        return this.deck.dealCard();
    }

    /**
     * Compare player scores to define winners
     * @returns {Array}
     */
    get winners(){
        let winners = [];
        if (this.bank.isBust){
            winners = this.players.filter(x => x.isStand);
        } else {
            winners = this.players.filter(x => (!x.isBust && x.getScore() > this.bank.getScore()));
        }
        return winners;
    }

    /**
     * Indicates that game fields are set for a new game
     * @returns {boolean}
     */
    get isNew(){
        return this.deck.dealtIndex === 0;
    }

    /**
     * Indicates that the game is finished (all players and the bank are ready)
     * @returns {boolean}
     */
    get isFinished(){
        return this.bank.isBust || (this.allPlayersReady && this.bank.isReady) || this.allPlayersBust;
    }

    /**
     * Indicates whether all players finished playing the game
     * @returns {boolean}
     */
    get allPlayersReady(){
        return (this.players.length > 0) && (this.players.filter(x => !x.isReady).length === 0);
    }

    /**
     * Indicates whether all players are bust
     * @returns {boolean}
     */
    get allPlayersBust(){
        return (this.players.length > 0) && (this.players.filter(x => !x.isBust).length === 0);
    }

    /**
     * Indicates that the game can start (there is at least one player and game fields are reset)
     * @returns {boolean}
     */
    get isReadyToStart(){
        return (this.isNew || this.isFinished) && (this.players.length > 0);
    }

    /**
     * Property that provides address of this object
     * @returns {{id: *, class}}
     */
    get address(){
        return {id: this.id, class: this.constructor.name};
    }

    /**
     * Print game winner names
     * @returns {string}
     */
    printWinners(){
        let winners = this.winners;
        return (winners.length > 0)
            ? this.winners.map(x => x.name).join(", ")
            : this.bank.isBust
                ? "No winners!"
                : "Bank wins!";
    }

    /**
     * Simulates actions of the bank
     */
    bankPlay(){
        if (this.allPlayersReady){
            while (this.bank.mustHit){
                let card = this.dealCard();
                this.bank.addCard(card);
                this.bank.addCommand(Command.HIT);
            }
            if (this.bank.mustStand){
                this.bank.addCommand(Command.STAND);
            }
        }
    }

    /**
     *  JSON object to store essential properties of the current object
     * @returns {{id: (number|*), class, deck: {id: *, class, cards: Array, dealtIndex: number}, bank: {id: *, class, name: *, hands: Array}, players: Array}}
     */
    toJSON(){
        return {
            id: this.id,
            class: this.constructor.name,
            deck: this.deck.toJSON(),
            bank: this.bank.toJSON(),
            players: this.players.map(x => x.toJSON())
        }
    }
}
