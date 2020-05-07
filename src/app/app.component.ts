import { Component, ɵConsole } from '@angular/core';
import { Item } from './models/Items';
import { ItemService } from './services/item.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	cartItems = [];
	search: string;
	currentItem: Item = null;
	constructor(private itemService: ItemService) {
		itemService.currentItem.subscribe((item) => {
			this.currentItem = item;
		});
	}
	

	startNewSearch() {
		this.itemService.changeSelectedItem(null);
		
	}
}
