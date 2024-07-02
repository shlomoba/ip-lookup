import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpSearchComponent } from './components/ip-search/ip-search.component';
import { LoaderComponent } from './components/loader/loader.component';
import { InputMarkerDirective } from './directives/input-marker.directive';

@NgModule({
  declarations: [AppComponent, IpSearchComponent, LoaderComponent, InputMarkerDirective],
  imports: [FormsModule, HttpClientModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
