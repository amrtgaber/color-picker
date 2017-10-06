import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

import { ColorService } from '../../services';
import { CanvasBoxInterface } from '../../interfaces';

@Component({
  selector: 'app-opacity',
  templateUrl: './opacity.component.html',
  styleUrls: ['./opacity.component.scss']
})
export class OpacityComponent implements CanvasBoxInterface {
  /* refernce to DOM */
  @ViewChild('opacity')
  private el: ElementRef;

  /* canvas context, width and height */
  public context: any;
  public width: number;
  public height: number;

  constructor(private colorService: ColorService) { }

  /**
   * Initialize canvas values and fill opacity gradient
   */
  ngAfterViewInit() {
    // Get canvas context, width and height
    this.context = this.el.nativeElement.getContext('2d');
    this.width = this.el.nativeElement.width;
    this.height = this.el.nativeElement.height;

    // Apply fill gradient to opacity component
    this.context.rect(0, 0, this.width, this.height);

    let gradient = this.context.createLinearGradient(0, 0, this.width, 0);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.17, 'rgba(0, 0, 0, 0.17)');
    gradient.addColorStop(0.34, 'rgba(0, 0, 0, 0.34)');
    gradient.addColorStop(0.51, 'rgba(0, 0, 0, 0.51)');
    gradient.addColorStop(0.68, 'rgba(0, 0, 0, 0.68)');
    gradient.addColorStop(0.85, 'rgba(0, 0, 0, 0.85)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

    this.context.fillStyle = gradient;
    this.context.fill();
  }

  /**
   * Emit selected color
   * @param  {any} event Click event
   */
  click(event) {
    let x = event.offsetX;
    let alpha = (x/this.width).toFixed(2);

    this.colorService.setAlpha(`${alpha}`);
  }
}
