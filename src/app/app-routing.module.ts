import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Just an example of route ( had some issues with retrieveing data from localStorage, and didn't use it as a main routing) */
const routes: Routes = [
	{
		path: 'cart'
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
