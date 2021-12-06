import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from './shared/network-graph/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class AvalancheService {

  constructor(private http: HttpClient) { }

  getTransactions(address: string): Observable<Transaction[]> {
    const url = `https://api.snowtrace.io/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=asc&apikey=${environment.api_key}`;
    return this.http.get<Transaction[]>(url);
  }

  getContracts(address: string): Observable<Transaction[]> {
    const url = `https://api.snowtrace.io/api?module=account&action=txlist&address=${address}&f=5&startblock=1&endblock=99999999&sort=asc&apikey=${environment.api_key}`;
    return this.http.get<Transaction[]>(url);
  }

  get() {
    const url = `https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json`;
    return this.http.get<any[]>(url);
  }

  getGasPrices() {
    return this.http.get<any>('https://api.debank.com/chain/gas_price_dict_v2?chain=avax');
  }

}
