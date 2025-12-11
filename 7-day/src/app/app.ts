import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for AsyncPipe
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {

}