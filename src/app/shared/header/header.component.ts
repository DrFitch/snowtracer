import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AvalancheService } from 'src/app/avalanche.service';

@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class SharedHeaderComponent implements OnInit {

  @Output() onSearch = new EventEmitter;

  address = '0x5d3e4c0fe11e0ae4c32f0ff74b4544c49538ac61';

  gas: any;

  constructor(private api: AvalancheService) { }

  ngOnInit(): void {
    this.getGasPrice();
  }

  getGasPrice() {
    this.api.getGasPrices().subscribe((result: any) => {
      this.gas = result.data;
      console.log('this.gas', this.gas);
    })
  }

  formatPrice(price: number) {
    return price / 1000000000;
  }

  getTransactions() {
    this.onSearch.next(this.address);
  }

}
