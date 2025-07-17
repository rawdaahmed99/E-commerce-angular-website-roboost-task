import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() direction: 'rtl' | 'ltr' = 'rtl';
  @Input() buttonText: string = 'اكتشف المزيد';
  @Input() showArrows: boolean = false;
  @Input() showDots: boolean = false;
  @Input() backgroundImage: string = '';
}
