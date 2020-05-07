import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Item } from '../models/Items';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiKey } from '../config/api'

@Injectable({
	providedIn: 'root'
})

export class ItemService {
	private selectedItem$: Subject<Item> = new Subject<Item>();
	private apiKey: string = apiKey;
	private baseConfigurationUrl: string = 'https://api.themoviedb.org/3/configuration';
	private baseApiUrl: string = 'https://api.themoviedb.org/3/search/movie';
	private imageBaseUrl: string = '';
	private imageSize: { poster?: string[] } = {};
	

	constructor(private http: HttpClient) {
		this.setImageConfiguration();
	}

	get currentItem() {
		return this.selectedItem$;
	}
	searchItem(query: string) {	
		const params = new HttpParams().set('api_key', this.apiKey).set('query', query);
		return this.http.get<any>(this.baseApiUrl, { params }).map((res) =>
			res.results.map((result: Item) => {
				return {
					...result,
					posterUrl: this.createPhotoUrl(result.poster_path)
				};				
			})
		);
	}
	changeSelectedItem(item: Item) {
		this.selectedItem$.next(item);
	}

	setImageConfiguration() {
		const params = new HttpParams().set('api_key', this.apiKey);
		this.http.get<any>(this.baseConfigurationUrl, { params }).map((res) => res).subscribe((config) => {
			(this.imageBaseUrl = config.images.base_url),
				(this.imageSize = {
					poster: config.images.backdrop_sizes
				});
		});
	}
	createPhotoUrl(path: string) {
		if (!path) {
			const placeholder = './assets/poster-placeholder.png'
			return placeholder;
		}
		const { poster } = this.imageSize;
		const imageSize = poster[poster.length - 1];
		return `${this.imageBaseUrl}${imageSize}${path}`;
	}
}