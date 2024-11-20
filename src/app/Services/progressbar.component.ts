
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProgressBarService } from './progress.service';

@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [AsyncPipe],
    template: `@if ((progressBarService.isLoading | async) != 0) {
        <div class="progress-bar">
            <div class="progress-bar-value"></div>
        </div>
    }`,
    styles: `/* progress-bar.component.scss */

    .progress-bar {
        height: 4px;
        background-color: rgba(5, 114, 206, 0.2);
        width: 100%;
        overflow: hidden;
    }
    
    .progress-bar-value {
        width: 100%;
        height: 100%;
        background-color: rgb(5, 114, 206);
        animation: indeterminateAnimation 1s infinite linear;
        transform-origin: 0% 50%;
    }
    
    @keyframes indeterminateAnimation {
        0% {
            transform: translateX(0) scaleX(0);
        }
    
        40% {
            transform: translateX(0) scaleX(0.4);
        }
    
        100% {
            transform: translateX(100%) scaleX(0.5);
        }
    }`
})
export class ProgressBarComponent {
    constructor(
        public progressBarService: ProgressBarService
    ) { }
}