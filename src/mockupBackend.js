import {
    parseInt,
    assign
} from 'lodash-bound';
import {Game} from './model/Game.js';
import {Command} from './model/Command';

/* simple storage implementation */
export const mockupBackend = () => {
    const game = new Game();

    /* the interface to hand to the library when instantiating a module */
    const backend = {
        async commit_new(player) {
            game.addPlayer(player);
            return player;
        },
        async commit_update(address, player) {
            game.players.find(p => p.id === address.id)::assign(player);
            return player;
        },
        async commit_command(command, player, handIndex){
            if (command === Command.HIT){
                let card = game.deck.dealCard();
                player.hands[handIndex].addCard(card);
            }
            game.players.find(p => p.id === player.id)::assign(player);
            game.bankPlay();
        }
   };
    return { backend, game };
};
