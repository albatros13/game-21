import {Component, Input} from '@angular/core';

@Component({
    selector: 'bank-panel',
    template:`
        <div class="panel" [ngClass]=_panelClass>
            <div class="panel-heading">Bank
                <div class="status pull-right">{{hand.getScore()}}</div>
            </div>
            <div class="panel-body">
                <span [innerHTML]="hand.htmlCards | safeHTML"></span>
            </div>
        </div>
    `,
    styles: [``]
})
export class BankHandPanel{
    @Input()  hand;

    /**
     * Style panel to reflect hand status
     * @returns {string}
     * @private
     */
    get _panelClass(){
        return this.hand.isReady? (this.hand.isBust? "panel-danger": "panel-warning"): "panel-success";
    }
}


