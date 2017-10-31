import {
	describe,
	it,
    expect,
	beforeEach,
    afterEach
} from './test.helper';

import {Player} from '../src/model/Player';
import {mockupBackend} from '../src/mockupBackend';
import {Command} from '../src/model/Command';

describe('GAME-21', () => {

    let {backend, game} = mockupBackend();
    let Alice = new Player("John");
    let Bob   = new Player("Bob");
    let Clair = new Player("Clair");
    let players = [Alice, Bob, Clair];

    describe('NEW_GAME', () => {
        it('initialize a game', () => {
            expect(game.deck.cards).to.have.length.of(52);
            expect(game.players).to.have.length.of(0);
            expect(game.isReadyToStart).to.be.false;
            expect(game.id).not.to.be.equal(0);
        });
        it('adds a new player', async () => {
            await backend.commit_new(Alice);
            expect(game.players).to.have.length.of(1);
            expect(game.isReadyToStart).to.be.true;
        });
        it ('should not accept more than 3 players', () => {
            game.players = [];
            players.forEach(p => game.addPlayer(p));
            expect(game.players).to.have.length.of(3);
            expect(() => game.addPlayer(new Player("Denis"))).to.throw;
        });
    });

    describe ('RUNNING_GAME', () => {
        beforeEach(() => {
            game.reset();
            game.players = players;
        });

        it ('game deals cards', () => {
            game.dealInitial();
            expect(game.players.map(p => p.hands[0].cards.length)).to.include.members([1, 1, 1]);
        });

        it ('game resets', () => {
            game.dealInitial();
            game.reset();
            expect(game.deck.dealtIndex).to.be.equal(0);
            expect(game.players.map(p => p.hands[0].cards.length)).to.include.members([0, 0, 0]);
        });

        it ('player receives a card on hit', async () => {
            game.dealInitial();
            await backend.commit_command(Command.HIT, players[0], 0);
            expect(players[0].hands[0].cards).to.have.length.of(2);
        });

        it ('game is notified about player action (e.g., stand)', async () => {
            game.dealInitial();
            players[0].hands[0].stand();
            await backend.commit_command(Command.STAND, players[0], 0);
            expect(game.players[0].hands[0].commands).to.include.members([Command.STAND]);
        });

        it ('hand is split when two cards with identical value are received', async () => {
            game.deck.reset(false); //game without deck shuffling contains equal value cards
            game.dealInitial();
            await backend.commit_command(Command.HIT, players[0], 0);
            await backend.commit_command(Command.HIT, players[0], 0);
            await backend.commit_command(Command.HIT, players[0], 0);
            await backend.commit_command(Command.HIT, players[0], 0);
            expect(players[0].hands[0].canSplit).to.be.true;
            players[0].split(game.players[0].hands[0]);
            await backend.commit_command(Command.SPLIT, players[0], 0);
            expect(game.players[0].hands).to.have.length.of(2);
        });
    });

    afterEach(() => {
    });
});
