import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { NetworkGraphComponent } from "./network-graph/network-graph.component";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { SharedHeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxGraphModule
  ],
  declarations: [
    NetworkGraphComponent,
    SharedHeaderComponent
  ],
  exports: [
    NetworkGraphComponent,
    SharedHeaderComponent
  ],
  providers: [
  ],
  entryComponents: [
  ]
})

export class SharedModule { }
