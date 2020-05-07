import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/Items';

@Component({
	selector: 'display-item',
	templateUrl: './display-item.component.html',
	styles: []
})
export class DisplayItemComponent implements OnInit {
	@Output() startNewSearch = new EventEmitter();
	

	@Input() item: Item;
	constructor() {}

	ngOnInit(): void {}
}
