import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../models/Items';
import { ItemService } from '../services/item.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { MessengerService } from '../services/messenger.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
@Component({
	selector: 'search-item',
	templateUrl: './search.component.html',
	styles: []
})
export class SearchComponent implements OnInit {
	item: Item = {};
	cartItems = [];
	searchResults: Item[] = [];
	search$: Subject<string> = new Subject<string>();
	fetching: boolean = false;
	totalRecords: number;
	page: number = 1;
	faSearch = faSearch;
	search: string = '';

	constructor(private itemService: ItemService, private router: Router, private msg: MessengerService) {}

	ngOnInit(): void {
		this.msg.getItem().subscribe((item: Item) => {
			this.addItemToCart(item);
		});
		this.search$
			.debounceTime(500)
			.map((query) => {
				this.fetching = true;
				return query;
			})
			.subscribe(this.searchQuery.bind(this));
	}

	goToPage(pageName: string): void {
		this.router.navigate([ `${pageName}` ]);
	}

	searchQuery(query: string) {
		if (query.length > 0) {
			this.itemService.searchItem(query).subscribe((results) => {
				this.fetching = false;
				this.searchResults = results;
				this.totalRecords = results.length;
			});
		} else {
			this.fetching = false;
			this.searchResults = [];
		}
	}
	showDiv = {
		previous: false,
		current: true,
		next: false
	};

	removeItemFromCart(title) {
		for (var i = 0; i < this.cartItems.length; i++) {
			if (this.cartItems[i]['title'] === title) {
				this.cartItems.splice(i, 1);
				console.log(title);
			}
		}
	}

	addItemToCart(item: Item) {
		let itemExists = false;
		for (let i in this.cartItems) {
			if (this.cartItems[i].title === item.title) {
				console.log('you cannot add items of same name');
				itemExists = true;
				break;
			}
		}

		if (!itemExists) {
			this.cartItems.push({
				title: item.title,
				posterUrl: item.posterUrl
			});
		}
	}
}
