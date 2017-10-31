import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import '../libs/rxjs';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import {Game21Module} from '../components/Game21Module.js';
import {PlayerModule} from '../components/PlayerModule.js';
import {Player} from '../model/Player.js';
import {Command} from '../model/Command.js';

import {mockupBackend} from '../mockupBackend';
let {backend, game} = mockupBackend();

//Replace simpleMockHandler with ajaxBackend for remote communication (not supported)
//import ajaxBackend from '../ajaxBackend';

@Component({
	selector: 'test-app',
	template: `
        <div *ngIf="game" class="panel">
            <game21-widget [game]="game"></game21-widget>
            <label class="pull-left">Add player: </label>
            <input class="form-control input-control input-control-lg pull-left"
                   [type]     = "text"
                   [disabled] = "game.players.length >= MAX_PLAYERS"
                   [(ngModel)]= "playerName"/>
            <button type="button" class="btn btn-default btn-icon"
                    [disabled]="game.players.length >= MAX_PLAYERS" (click)="_addPlayer()">
                    <span class="glyphicon glyphicon-plus"></span>
            </button>
        </div>
        <div *ngIf="game" class="panel">
            <div class="input-control" *ngFor="let player of players">
                <player-panel [player]="player" (command)="_onCommand($event)"></player-panel>
            </div>
        </div>

    `,
    styles: [`
        :host >>> label{
            padding: 6px;
        }
        :host >>> .input-control {
            margin-left: 4px;
            padding: 2px;
            display: inline-block;
            vertical-align:top;
        }
        :host >>> .input-control-lg {
            width: 178px;
        }
        :host >>> .panel-heading{
            padding: 0
        }
        :host >>> .panel-body{
            border: 1px solid #ccc;
        }
        host >>> .state {
            margin-left: 4px;
            padding: 2px;
        }
        :host >>> .status {
            width: 20px;
            height: 20px;
            text-align: center;
            padding: 0;
            border: 2px solid #888;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            -webkit-box-shadow: 1px 1px 1px #ccc;
            -moz-box-shadow: 1px 1px 2px #ccc;
            box-shadow: 1px 1px 2px #ccc;
        }
    `]
})
/**
 * The TestComponent component, showing off the Game-21 prototype!
 */
export class TestApp {
    game        = game;
    playerName  = "";
    MAX_PLAYERS = 3;
    players     = [];    // Client-side player panels

    /**
     * Add new player to the game
     * @returns {Promise.<void>}
     * @private
     */
    async _addPlayer(){
        this.players.push( await backend.commit_new(new Player(this.playerName)));
    }

    /**
     * Notify game-server about performed action
     * @param command - new command
     * @param hand    - player's hand
     * @param player  - player that performed the command
     * @private
     */
    async _onCommand({command, player, hand}){
        hand.addCommand(command);
        if (command === Command.SPLIT){
            player.split(hand);
        }
        await backend.commit_command(command, player, hand.index);
    }
}

/**
 * The TestAppModule test module, which supplies the _excellent_ TestApp test application!
 */
@NgModule({
	imports: [
		BrowserModule,
        FormsModule,
		Game21Module,
        PlayerModule
	],
	declarations: [
		TestApp
	],
	bootstrap: [TestApp],
})
export class TestAppModule {}
