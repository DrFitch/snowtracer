import { Component, OnInit } from '@angular/core';
import { ClusterNode, Node, Edge } from '@swimlane/ngx-graph';
import { uniqBy, uniqueId } from 'lodash';
import { AvalancheService } from '../avalanche.service';
import { Transaction } from '../shared/network-graph/models/transaction.model';

import * as d3 from 'd3-selection';
import * as d3Force from 'd3-force';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  transactions: Transaction[] = [];
  links: Edge[] = [];
  nodes: Node[] = [];
  clusters: ClusterNode[] = [];

  ready = false;


  // tests
  currentRate = 8;
  title = 'D3 Barchart with Angular 10';
  width: number = 400;
  height: number = 400;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;

  constructor(private api: AvalancheService) {
    this.width = 900; // - this.margin.left - this.margin.right;
    this.height = 500; // - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.api.getGasPrices().subscribe((result: any) => {
      console.log('result', result);
    });
    // this.drawBars();
  }

  initSvg() {
    this.svg = d3.select('#my_dataviz')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(StatsBarChart.map((d) => d.company));
    this.y.domain([0, d3Array.max(StatsBarChart, (d) => d.frequency)]);
  }

  drawAxis() {
    this.api.get().subscribe((result: any) => {
      console.log('result', result);
      this.g.selectAll('line')
        .data(result.links)
        .enter()
        .append('line')
        .style('stroke', '#aaa')

      this.g.selectAll('circle')
        .data(result.nodes)
        .enter()
        .append('circle')
        .attr('r', 20)
        .style('fill', '#69b3a2')

      d3Force.forceSimulation(result.nodes)                 // Force algorithm is applied to data.nodes
        .force('link', d3Force.forceLink()                  // This force provides links between nodes
          .id(function (d: any) { return d.id; })           // This provide  the id of a node
          .links(result.links)                              // and this the list of links
        )
        .force('charge', d3Force.forceManyBody().strength(-400))                   // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force('center', d3Force.forceCenter(this.width / 2, this.height / 2))     // This force attracts nodes to the center of the svg area
        .on('end', this.ticked);
    });
  }

  ticked() {
    this.g
      .attr('x1', function (d: any) { return d.source.x; })
      .attr('y1', function (d: any) { return d.source.y; })
      .attr('x2', function (d: any) { return d.target.x; })
      .attr('y2', function (d: any) { return d.target.y; });

    this.g
      .attr('cx', function (d: any) { return d.x + 6; })
      .attr('cy', function (d: any) { return d.y - 6; });
  }


  // this.g.append('g')
  //   .attr('class', 'axis axis--x')
  //   .attr('transform', 'translate(0,' + this.height + ')')
  //   .call(d3Axis.axisBottom(this.x));
  // this.g.append('g')
  //   .attr('class', 'axis axis--y')
  //   .call(d3Axis.axisLeft(this.y))
  //   .append('text')
  //   .attr('class', 'axis-title')
  //   .attr('transform', 'rotate(-90)')
  //   .attr('y', 6)
  //   .attr('dy', '0.71em')
  //   .attr('text-anchor', 'end')
  //   .text('Frequency');


  // drawBars() {
  //   this.g.selectAll('line')
  //     .data(data.links)
  //     .enter()
  //     .append('line')
  //     .style('stroke', '#aaa')


  //   this.g.selectAll('.bar')
  //     .data(StatsBarChart)
  //     .enter().append('rect')
  //     .attr('class', 'bar')
  //     .attr('x', (d: any) => this.x(d.company))
  //     .attr('y', (d: any) => this.y(d.frequency))
  //     .attr('width', this.x.bandwidth())
  //     .attr('fill', '#498bfc')
  //     .attr('height', (d: any) => this.height - this.y(d.frequency));
  // }



  getTransactions(address: string) {
    this.api.getTransactions(address).subscribe((call: any) => {
      this.transactions = call.result.slice(0, 50);
      if (this.transactions.length > 0) {
        this.generateLinks(address);
        this.generateNodes(address);
      }
    });
  }

  generateLinks(address: string) {
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

  generateNodes(address: string) {
    const addressesFrom = this.transactions.map(x => x.from);
    const addressesTo = this.transactions.map(x => x.to);

    // on recupère toutes les adresses et on fait en sorte qu'elles soient uniques
    const addresses = uniqBy([...addressesFrom, ...addressesTo], function (x) {
      return x;
    });

    addresses.forEach(address => {
      this.nodes.push({
        id: address,
        label: address
      })
    });

    this.generateCluster(address);
  }

  generateCluster(address: string) {
    this.api.getContracts(address).subscribe((result: any) => {
      const contracts = result.result.slice(1, 5).map((x: any) => x.from);
      const test = this.links.filter(x => contracts.includes(x.target)).map(x => x.target);
      this.clusters.push({
        id: '1',
        label: 'Contracts',
        childNodeIds: test
      });
      this.ready = true;
    });
  }

}

export const StatsPieChart: any[] = [
  { party: 'BJP', electionP: 56 },
  { party: 'INC', electionP: 18 },
  { party: 'AA', electionP: 10 },
  { party: 'CPI', electionP: 5 },
  { party: 'CPI-M', electionP: 5 },
  { party: 'BSP', electionP: 7 },
  { party: 'AITS', electionP: 10 }
];

export interface Employee {
  company: string;
  frequency: number;
}

export const StatsBarChart: Employee[] = [
  { company: 'Apple', frequency: 100000 },
  { company: 'IBM', frequency: 80000 },
  { company: 'HP', frequency: 20000 },
  { company: 'Facebook', frequency: 70000 },
  { company: 'TCS', frequency: 12000 },
  { company: 'Google', frequency: 110000 },
  { company: 'Wipro', frequency: 5000 },
  { company: 'EMC', frequency: 4000 }
];