import {NgModule, Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {HandPanel} from './HandPanel';
import {SafeHtmlPipe} from './Pipes';

@Component({
    selector: 'player-panel',
    template:`
        <div class="panel" [ngClass]=_panelClass>
            <div class="panel-heading">{{player.id}}:{{player.name}}
                <div class="status pull-right">{{player.getScore()}}</div>
            </div>
            <div class="panel-body">
                <div class="input-control" *ngFor="let hand of player.hands">
                    <hand-panel [hand]="hand" (command)="_onCommand($event)"></hand-panel>
                </div>
            </div>
        </div>
    `,
    styles: [``]
})
/**
 * Game-21 player widget
 */
export class PlayerWidget{
    @Input() player;
    @Output() command = new EventEmitter();

    /**
     * Process player's command
     * @param command
     * @param hand
     * @private
     */
    _onCommand({command, hand}){
        this.command.emit({command: command, player: this.player, hand: hand});
    }

    /**
     * Style panel to reflect player's status
     * @returns {string}
     * @private
     */
    get _panelClass(){
        return this.player.isReady? (this.player.isBust? "panel-danger": "panel-warning"): "panel-success";
    }
}

/**
 * Module that provides
 */
@NgModule({
    imports:      [
        CommonModule,
        FormsModule,
    ],
    declarations: [ PlayerWidget, HandPanel, SafeHtmlPipe],
    exports:      [ PlayerWidget, SafeHtmlPipe]
})
export class PlayerModule {}



