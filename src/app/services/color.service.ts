import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ColorService {
  /* track the picked color */
  private color: string;

  /* create stream of color selection from inputs */
  private colorInput = new Subject<string>();
  public colorStream = this.colorInput.asObservable();

  /* track the picked hue */
  private hue: string;

  /* create stream of hue selection */
  private hueInput = new Subject<string>();
  public hueStream = this.hueInput.asObservable();

  /* red, green, blue and alpha values for color selection */
  private r = '0';
  private g = '0';
  private b = '0';
  private a = '1';

  /**
   * Sets RGB values for selected color and calls setColor()
   * @param  {string} r Red value
   * @param  {string} g Green value
   * @param  {string} b Blue value
   */
  setRGB(r: string, g: string, b: string) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.setColor();
  }

  /**
   * Sets alpha value for selected color and calls setColor()
   * @param  {string} a Alpha value
   */
  setAlpha(a: string) {
    this.a = a;
    this.setColor();
  }

  /**
   * Stores selected color and emits it
   * @param  {string} color The picked color
   */
  setColor(color: string = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`) {
    this.color = color;
    this.colorInput.next(this.color);
  }

  /**
   * Stores the selected hue and emits it
   * @param  {string} hue The selected hue
   */
  setHue(hue: string) {
    this.hue = hue;
    this.hueInput.next(hue);
  }
}
