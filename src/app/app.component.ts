import { Component } from '@angular/core';
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
		/*Setting the current item (Opening a display page) */
		itemService.currentItem.subscribe((item) => {
			this.currentItem = item;
		});
	}
	/*Setting the selected items to be null (returning back to the search page) */
	startNewSearch() {
		this.itemService.changeSelectedItem(null);
	}
}
