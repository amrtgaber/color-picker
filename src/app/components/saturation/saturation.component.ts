import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ColorService } from '../../services';
import { CanvasBoxInterface } from '../../interfaces';

@Component({
  selector: 'app-saturation',
  templateUrl: './saturation.component.html',
  styleUrls: ['./saturation.component.scss']
})
export class SaturationComponent implements OnInit, OnDestroy, CanvasBoxInterface {
  /* refernce to DOM */
  @ViewChild('saturation')
  private el: ElementRef;

  /* canvas context, width and height */
  public context: any;
  public width: number;
  public height: number;

  /* hue stream subscription */
  public subscription: Subscription;

  constructor(private colorService: ColorService) { }

  /**
   * Subscribe to hue stream
   */
  ngOnInit() {
    this.subscription = this.colorService.hueStream.subscribe( hue => this.fillGradient(hue) );
  }

  /**
   * Initialize canvas values and call fillGradient()
   */
  ngAfterViewInit() {
    this.context = this.el.nativeElement.getContext('2d');
    this.width = this.el.nativeElement.width;
    this.height = this.el.nativeElement.height;

    this.fillGradient();
  }

  /**
   * Unlink hue stream subscription
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Fill saturation canvas with selected color gradient
   * @param  {string} hue The hue to fill the gradient with
   */
  fillGradient(hue: string = 'rgba(255,0,0,1)') {
    this.context.fillStyle = hue;
    this.context.fillRect(0, 0, this.width, this.height);

    let whiteGradient = this.context.createLinearGradient(0, 0, this.width, 0);
    whiteGradient.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGradient.addColorStop(1, 'rgba(255,255,255,0)');
    this.context.fillStyle = whiteGradient;
    this.context.fillRect(0, 0, this.width, this.height);

    let blackGradient = this.context.createLinearGradient(0, 0, 0, this.height);
    blackGradient.addColorStop(0, 'rgba(0,0,0,0)');
    blackGradient.addColorStop(1, 'rgba(0,0,0,1)');
    this.context.fillStyle = blackGradient;
    this.context.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Emit selected color
   * @param  {any} event Click event
   */
  click(event: any) {
    let x = event.offsetX;
    let y = event.offsetY;
    let imageData = this.context.getImageData(x, y, 1, 1).data;

    this.colorService.setRGB(imageData[0], imageData[1], imageData[2]);
  }
}
