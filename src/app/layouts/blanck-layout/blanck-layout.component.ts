import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

import { FooterComponent } from "../../shared/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'app-blanck-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent, LoaderComponent],
  templateUrl: './blanck-layout.component.html',
  styleUrl: './blanck-layout.component.css'
})
export class BlanckLayoutComponent {

}
