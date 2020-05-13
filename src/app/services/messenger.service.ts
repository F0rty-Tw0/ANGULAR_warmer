import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MessengerService {
	subject = new Subject();

	constructor() {}

	//Simple messenger service, sending the subject of item, and also storing it to the localStorage as a JSON
	//Need some extra help to make it actually work, currently using the subject only.
	sendItem(item: any) {
		this.subject.next(item);
		localStorage.setItem('ordered', JSON.stringify(item));
		if (localStorage.getItem('ordered') === null) {
			item = [];
		} else {
			item = JSON.parse(localStorage.getItem('ordered'));
		}
	}

	getItem() {
		//Returning this item as Observable
		//Also need some extra help to make to make it return from the localStorage and not subject
		return this.subject.asObservable();
	}
}
