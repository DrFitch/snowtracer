import { Component, Input, OnInit } from '@angular/core';
import { ClusterNode, Edge, Node } from '@swimlane/ngx-graph';
import { Transaction } from './models/transaction.model';

@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.scss']
})
export class NetworkGraphComponent implements OnInit {

  @Input() transactions: Transaction[] = [];
  @Input() links: Edge[] = [];
  @Input() nodes: Node[] = [];
  @Input() clusters: ClusterNode[] = [];

  title = 'snowtracer';
  ready = false;

  innerWidth = 0;
  innerHeight = 0;

  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight - 100;
  }

  
}
