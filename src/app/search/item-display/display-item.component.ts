import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/Items';

@Component({
	selector: 'display-item',
	templateUrl: './display-item.component.html',
	styles: []
})
export class DisplayItemComponent implements OnInit {
	//Event emitter of a new search, from nullifing the currentItem
	@Output() startNewSearch = new EventEmitter();

	@Input() item: Item;
	constructor() {}

	ngOnInit(): void {}
}
