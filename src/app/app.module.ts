import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvalancheService } from './avalanche.service';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HomeModule,
    SharedModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
  ],
  providers: [
    AvalancheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
