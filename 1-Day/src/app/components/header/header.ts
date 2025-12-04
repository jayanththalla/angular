import { Component } from '@angular/core';

@Component({
  selector: 'app-header',      // This is the tag we used in HTML: <app-header>
  standalone: true,            // CRITICAL: This makes it a Modern Angular component
  imports: [],                 // No dependencies needed for this simple header
  templateUrl: './header.html',
  styleUrl: './header.scss' // or .css, depending on what you chose
})
export class HeaderComponent {
  // Logic goes here. 
  // Since this is just a static header for now, this class can remain empty.
}