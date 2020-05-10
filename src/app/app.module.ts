import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DisplayItemComponent } from './search/item-display/display-item.component';
import { SearchComponent } from './search/search.component';
import { ItemPreviewComponent } from './search/item-preview/item-preview.component';
import { FooterComponent } from './shared/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemService } from './services/item.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ AppComponent, DisplayItemComponent, SearchComponent, ItemPreviewComponent, FooterComponent ],
	imports: [
		BrowserModule,
		NgbModule,
		FontAwesomeModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		RouterModule.forRoot([ { path: 'Cart', component: SearchComponent } ])
	],
	providers: [ ItemService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
