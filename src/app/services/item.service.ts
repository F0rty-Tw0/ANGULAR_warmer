import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Item } from '../models/Items';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiKey } from '../config/api';

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	private selectedItem$: Subject<Item> = new Subject<Item>();
	// Using the ApiKey from config api.ts
	private apiKey: string = apiKey;
	// Declaring the api url and configurations url
	private baseConfigurationUrl: string = 'https://api.themoviedb.org/3/configuration';
	private baseApiUrl: string = 'https://api.themoviedb.org/3/search/movie';
	private imageBaseUrl: string = '';
	private imageSize: { poster?: string[] } = {};

	constructor(private http: HttpClient) {
		// Setting the image configurations
		this.setImageConfiguration();
	}
	// Retrieving the current item, from selected items
	get currentItem() {
		return this.selectedItem$;
	}
	// Searching function through API, and storing the results into Item
	searchItem(query: string) {
		//Using the API key
		const params = new HttpParams().set('api_key', this.apiKey).set('query', query);
		//Using the API URL
		return this.http.get<any>(this.baseApiUrl, { params }).map((res) =>
			//Responding with the results
			res.results.map((result: Item) => {
				return {
					...result,
					//Making Poster URL
					posterUrl: this.createPhotoUrl(result.poster_path)
				};
			})
		);
	}
	//Function to change the selected item
	changeSelectedItem(item: Item) {
		this.selectedItem$.next(item);
	}
	//Setting the image through configuration URL
	setImageConfiguration() {
		//Using the API key
		const params = new HttpParams().set('api_key', this.apiKey);
		//Using the Configuration URL
		this.http.get<any>(this.baseConfigurationUrl, { params }).map((res) => res).subscribe((config) => {
			//Retrieving the Image URL and the size
			(this.imageBaseUrl = config.images.base_url),
				(this.imageSize = {
					poster: config.images.backdrop_sizes
				});
		});
	}
	//Creating The Image and if there is none, using the placeholder stored in assets
	createPhotoUrl(path: string) {
		if (!path) {
			const placeholder = './assets/poster-placeholder.png';
			return placeholder;
		}
		const { poster } = this.imageSize;
		const imageSize = poster[poster.length - 1];
		return `${this.imageBaseUrl}${imageSize}${path}`;
	}
}
