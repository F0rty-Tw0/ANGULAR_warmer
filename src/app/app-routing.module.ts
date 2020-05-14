import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './search//cart-items/cart.component';

/*Just an example of route ( had some issues with retrieveing data from localStorage, and didn't use it as a main routing) */
const routes: Routes = [ { path: 'cart', component: CartComponent }, { path: 'search', component: SearchComponent } ];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
