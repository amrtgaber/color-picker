import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

import { ColorService } from '../../services';
import { CanvasBoxInterface } from '../../interfaces';

@Component({
  selector: 'app-hue',
  templateUrl: './hue.component.html',
  styleUrls: ['./hue.component.scss']
})
export class HueComponent implements CanvasBoxInterface {
  /* refernce to DOM */
  @ViewChild('hue')
  private el: ElementRef;

  /* canvas context, width and height */
  public context: any;
  public width: number;
  public height: number;

  constructor(private colorService: ColorService) { }

  /**
   * Initialize canvas values and fill hue gradient
   */
  ngAfterViewInit() {
    // Get canvas context, width and height
    this.context = this.el.nativeElement.getContext('2d');
    this.width = this.el.nativeElement.width;
    this.height = this.el.nativeElement.height;

    // Apply color gradient to hue component
    this.context.rect(0, 0, this.width, this.height);

    let gradient = this.context.createLinearGradient(0, 0, this.width, 0);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    this.context.fillStyle = gradient;
    this.context.fill();
  }

  /**
   * Emit selected color
   * @param  {any} event Click event
   */
  click(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    let imageData = this.context.getImageData(x, y, 1, 1).data;
    let color = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';

    this.colorService.setHue(color);
  }
}
