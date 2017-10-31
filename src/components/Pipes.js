import {Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

/**
 * Pipe to transform HTML text so that angular preserves styling
 */
@Pipe({ name: 'safeHTML'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(sanitized: DomSanitizer) {
        this.sanitized = sanitized;
    }
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}