import { Routes } from '@angular/router';
import { AppComponent } from './app';
// Note: We usually separate the 'List' into its own component, 
// but for this tutorial, we will assume your list logic is in a 'HomeComponent' 
// or we will just route the root to a ListComponent.

// Let's quickly create a specific Home component to hold yesterday's list logic
// Run: ng g c pages/home
import { HomeComponent } from './pages/home/home';
import { ProductDetailsComponent } from './pages/product-details/product-details';

export const routes: Routes = [
    // Default path (Home)
    { path: '', component: HomeComponent },

    // Dynamic path. :id is a variable placeholder.
    { path: 'product/:id', component: ProductDetailsComponent },

    // Wildcard (Redirect unknown paths to home)
    { path: '**', redirectTo: '' }
];