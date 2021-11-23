import { Component } from '@angular/core';
import { uniqBy, uniqueId } from 'lodash';
import { AvalancheService } from './avalanche.service';
import { Link } from './models/link.model';
import { ClusterNode, Node } from './models/node.model';
import { Transaction } from './models/transaction.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  address = '0x5d3e4c0fe11e0ae4c32f0ff74b4544c49538ac61';

  title = 'snowtracer';

  transactions: Transaction[] = [];
  links: Link[] = [];
  nodes: Node[] = [];
  clusters: ClusterNode[] = [];

  ready = false;
  constructor(private api: AvalancheService) { }

  getTransactions() {
    this.api.getTransactions(this.address).subscribe((call: any) => {
      this.transactions = call.result.slice(0, 50);
      if (this.transactions.length > 0) {
        this.generateLinks();
        this.generateNodes();
      }
    });
  }

  generateLinks() {
    this.transactions.forEach(transaction => {
      if (transaction.to) {
        this.links.push({
          id: uniqueId('address'),
          source: transaction.from,
          target: transaction.to,
          label: ''
        });
      }
    });
  }

  generateNodes() {
    const addressesFrom = this.transactions.map(x => x.from);
    const addressesTo = this.transactions.map(x => x.to);

    // on recupère toutes les adresses et on fait en sorte qu'elles soient uniques
    const addresses = uniqBy([...addressesFrom, ...addressesTo], function (x) {
      return x;
    });

    //
    addresses.forEach(address => {
      this.nodes.push({
        id: address,
        label: address
      })
    });

    this.generateCluster();
  }

  generateCluster() {
    this.api.getContracts(this.address).subscribe((result: any) => {
      const contracts = result.result.slice(1, 5).map((x: any) => x.from);
      console.log('links', this.links);
      console.log('contracts', contracts);
      const test = this.links.filter(x => contracts.includes(x.target)).map(x => x.target);
      console.log('this.transactions.find(x => contracts.includes(x.to))', test);
      this.clusters.push({
        id: '1',
        label: 'Contracts',
        childNodeIds: test
      });
      this.ready = true;

      console.log('this.clusters', this.clusters);
    })

  }
}
