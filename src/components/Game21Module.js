import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {Command} from '../model/Command';
import {BankHandPanel} from './BankHandPanel';
import {PlayerModule} from './PlayerModule';

@Component({
    selector: 'game21-widget',
    template:`
        <div class="panel panel-info">
            <div class="panel-heading"> Game {{game.id}}</div>
            <div class="panel-body">
                <div class="state"><label >Dealt: </label>
                    <span [innerHTML]="game.deck.htmlDealtCards | safeHTML"></span>
                </div>
                <div class="input-control input-control-lg">
                    <bank-panel [hand]="game.bank"></bank-panel>
                </div>
                <button type="button" 
                     [disabled]="!game.isReadyToStart" (click)="_startGame()">Start game
                </button>
                <div *ngIf="game.isFinished"><label>Winners: </label>{{game.printWinners()}}
                </div>
            </div>
        </div>
    `
    ,
    styles: [``]
})
/**
 * Game-21 widget
 */
export class Game21Widget{
    @Input() game;

    /**
     * Start game, deal initial
     * @private
     */
    _startGame(){
        this.game.dealInitial();
    }
}
/**
 *  Module that provides Game-21 widget
 */
@NgModule({
    imports:      [
        CommonModule,
        FormsModule,
        PlayerModule
    ],
    declarations: [ Game21Widget, BankHandPanel],
    exports:      [ Game21Widget ]
})
export class Game21Module {}


