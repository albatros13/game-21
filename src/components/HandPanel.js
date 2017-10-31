import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Command} from '../model/Command';

@Component({
    selector: 'hand-panel',
    template:`
        <div class="panel" [ngClass]=_panelClass>
            <div panel-heading>
                <label>{{hand.index + 1}} </label> 
                <span *ngIf="hand.parentHand">split of {{hand.parentHand.index + 1}}</span>
                <div class="status pull-right">{{hand.getScore()}}</div>
            </div>
            <div class="panel-body">
                <div class="state">
                    <span [innerHTML]="hand.htmlCards | safeHTML"></span>
                </div>
                <button type="button" class="btn btn-default btn-icon"
                        [disabled]="!hand.canHit" (click)="_onCommand(Command.HIT)">
                    <img class="imtip" src="../images/hit.png"/>
                </button>
                <button type="button" class="btn btn-default btn-icon"
                        [disabled]="!hand.canStand" (click)="_onCommand(Command.STAND)">
                    <img class="imtip" src="../images/stand.png"/>
                </button>
                <button type="button" class="btn btn-default btn-icon"
                        [disabled]="!hand.canSplit" (click)="_onCommand(Command.SPLIT)">
                    <img class="imtip" src="../images/split.png"/>
                </button>
            </div>
        </div>
    `,
    styles: [`
        :host >>> .imtip {
            position: relative;
            height: 32px;
        }
    `]
})
/**
 *
 */
export class HandPanel{
    @Input()  hand;
    @Output() command = new EventEmitter();
    Command = Command;

    /**
     * Process player's command
     * @param command
     * @private
     */
    _onCommand(command){
        this.command.emit({command: command, hand: this.hand});
    }

    /**
     * Style panel to reflect hand status
     * @returns {string}
     * @private
     */
    get _panelClass(){
        return this.hand.isReady? (this.hand.isBust? "panel-danger": "panel-warning"): "panel-success";
    }

}


