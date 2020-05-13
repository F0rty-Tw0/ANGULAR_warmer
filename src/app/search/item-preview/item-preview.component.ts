import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/Items';
import { ItemService } from '../../services/item.service';
import { MessengerService } from '../../services/messenger.service';
import mediumZoom from 'medium-zoom';

@Component({
	selector: 'item-preview',
	templateUrl: './item-preview.component.html',
	styles: []
})
export class ItemPreviewComponent implements OnInit {
	@Input() item: Item = {};
	//Assigning the index as 1
	@Input() index: number = 1;

	constructor(private itemService: ItemService, private msg: MessengerService) {}

	ngOnInit() {}

	//Setting the current item
	setCurrentItem(item: Item) {
		this.itemService.changeSelectedItem(item);
	}
	//Small animation delay function for the data import
	animationDelay = () => ({
		'animation-delay': `${this.index * 0.1}s`
	});

	//Add to cart button function
	handleAddToCart() {
		this.msg.sendItem(this.item);
	}
	//Zooming to a poster from icon
	zoom() {
		const zoom = mediumZoom('.item-preview_poster', { background: 'rgba(41, 41, 41, 0.5)', margin: 24 });
		addEventListener('click', () => zoom.close());
	}
}
