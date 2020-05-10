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
	@Input() index: number = 1;

	constructor(private itemService: ItemService, private msg: MessengerService) {}

	ngOnInit() {}

	setCurrentItem(item: Item) {
		this.itemService.changeSelectedItem(item);
	}

	animationDelay = () => ({
		'animation-delay': `${this.index * 0.1}s`
	});

	handleAddToCart() {
		this.msg.sendItem(this.item);
	}
	zoom() {
		const zoom = mediumZoom('.item-preview_poster', { background: 'rgba(41, 41, 41, 0.5)', margin: 24 });
		addEventListener('click', () => zoom.close());
	}
}
