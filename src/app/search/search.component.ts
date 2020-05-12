import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../models/Items';
import { ItemService } from '../services/item.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { MessengerService } from '../services/messenger.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import mediumZoom from 'medium-zoom';

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

	constructor(
		private itemService: ItemService,
		private router: Router,
		private msg: MessengerService,
		private _flashMessagesService: FlashMessagesService
	) {}

	zoom() {
		const zoom = mediumZoom('.item-preview_poster', { background: 'rgba(41, 41, 41, 0.5)', margin: 24 });
		addEventListener('click', () => zoom.close());
	}
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
			}
		}
	}

	addItemToCart(item: Item) {
		let itemExists = false;
		for (let i in this.cartItems) {
			if (this.cartItems[i].title === item.title) {
				this._flashMessagesService.show('You cannot add ' + this.cartItems[i].title + ' more than one time!', {
					cssClass: 'alert-danger animated fadeIn',
					timeout: 2000
				});
				itemExists = true;
				break;
			}
		}

		if (!itemExists) {
			this.cartItems.push({
				title: item.title,
				posterUrl: item.posterUrl
			});

			this._flashMessagesService.show('You added ' + item.title + ' to your cart.', {
				cssClass: 'alert-success animated fadeIn',
				timeout: 2000
			});
		}
	}
}
