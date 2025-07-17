import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerece';
  ngOnInit() {
  const savedMode = localStorage.getItem('theme');
  if (savedMode === 'dark') {
    document.body.classList.add('dark-mode');
  }
}

}
