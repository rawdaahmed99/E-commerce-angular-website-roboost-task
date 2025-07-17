import { Component } from '@angular/core';
import { SpecialproductsComponent } from "../specialproducts/specialproducts.component";
import { FeaturesStripComponent } from "../features-strip/features-strip.component";
import { CategoriesBannerComponent } from "../categories-banner/categories-banner.component";
import { NewArrivalsComponent } from "../new-arrivals/new-arrivals.component";
import { AdvertisementComponent } from "../advertisement/advertisement.component";
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, SpecialproductsComponent, FeaturesStripComponent, CategoriesBannerComponent, NewArrivalsComponent, AdvertisementComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
