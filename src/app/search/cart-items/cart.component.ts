import { Component, OnInit, Input } from '@angular/core';
import mediumZoom from 'medium-zoom';
import { Router } from '@angular/router';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: []
})
export class CartComponent implements OnInit {
	@Input() cartItem: any[] = [];
	@Input() showDivCart: any = {};
	constructor(private router: Router) {}

	ngOnInit(): void {}

	//Again zoom, but this time for the cart part ( TODO - move it to separate component)
	zoom() {
		const zoom = mediumZoom('.item-preview_poster', { background: 'rgba(41, 41, 41, 0.5)', margin: 24 });
		addEventListener('click', () => zoom.close());
	}

	//Remove from Cart function, currently based on title (TODO add id's when localStorage will work)
	removeItemFromCart(title: string) {
		for (var i = 0; i < this.cartItem.length; i++) {
			if (this.cartItem[i]['title'] === title) {
				this.cartItem.splice(i, 1);
			}
		}
	}

	//Routing navigation
	goToPage(pageName: string): void {
		this.router.navigate([ `${pageName}` ]);
	}
}
