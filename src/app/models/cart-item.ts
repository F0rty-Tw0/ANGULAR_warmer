import { Item } from './items'
export class Cart {
	poster_path?: string | null;
	original_title?: string;
	overview?: string;
	title?: string;
	release_date?: string;
	posterUrl?: string;
    id?: number;
    
    constructor (id: number, item: Item){
        this.id = id;
		this.title = item.title;
		this.posterUrl = item.posterUrl;
    }
}
