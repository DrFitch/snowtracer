import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutingModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
