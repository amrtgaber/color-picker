import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ColorService } from '../../services';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit, OnDestroy {
  /* refernce to DOM */
  @ViewChild('color')
  private el: ElementRef;

  /* color string */
  public rgbaString: string;

  /* color stream subscription */
  public subscription: Subscription;

  constructor(private renderer: Renderer2, private colorService: ColorService) { }

  /**
   * Subscribe to color stream
   */
  ngOnInit() {
    this.subscription = this.colorService.colorStream.subscribe( color => {
      this.rgbaString = color;
      this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    });
  }

  /**
   * Unlink color stream subscription
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
