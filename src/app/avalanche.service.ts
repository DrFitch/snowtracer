import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from './models/transaction.model';

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

}
