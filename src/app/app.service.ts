import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

private api_token = 'PIFFTNPS3E8FY4GPHQ18GUV6XXRKDBIDBS';

constructor(private http: HttpClient) { }

getAddress(contractAddress: string) {
  return this.http.get(`https://api.snowtrace.io/api?module=account&action=txlist&address=${contractAddress}&startblock=1&endblock=99999999&sort=asc&apikey=${this.api_token}`);
}

getContract(contractAddress: string) {
  return this.http.get(`https://api.snowtrace.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${this.api_token}`);
}

}

