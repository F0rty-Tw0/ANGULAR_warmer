import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MessengerService {
	subject = new Subject();

	constructor() {}

	sendItem(item) {
		this.subject.next(item);
		localStorage.setItem('ordered', JSON.stringify(item));
		if (localStorage.getItem('ordered') === null) {
			item = [];
		} else {
			item = JSON.parse(localStorage.getItem('ordered'));
		}
	}

	getItem() {
		return this.subject.asObservable();
	}
}
