import {
  Component,
  OnChanges,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import * as d3 from 'd3';
import { Friend } from 'src/app/store/friend.model';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.scss'],
})

export class AgeChartComponent implements OnChanges, AfterViewInit {
  @ViewChild('chart') chartContainer?: ElementRef;
  @Input() friends: Friend[] = [];
  svg: any;
  margin = 50;
  width = 600 - this.margin * 1;
  height = 200 - this.margin * 1;

  ngAfterViewInit(): void {
    this.drawSvg();
    this.drawBars(this.friends);
  }

  ngOnChanges(SimpleChanges: SimpleChanges): void {
    const changes = SimpleChanges['friends'];
    let firstChange = changes.firstChange;
    if (!firstChange) {
      this.friends = changes.currentValue;
      this.updateBars();
    }
  }

  updateBars(): void {
    if (this.chartContainer) {
      let element = this.chartContainer.nativeElement;
      this.svg = d3.select(element).selectChild().remove();
      this.drawSvg();
      this.drawBars(this.friends);
    }
  }

  drawSvg(): void {
    if (this.chartContainer) {
      let element = this.chartContainer.nativeElement;
      this.svg = d3
        .select(element)
        .append('svg')
        .attr('width', this.width + this.margin * 2)
        .attr('height', this.height + this.margin * 2)
        .append('g')
        .classed('svg-conatiner', true)
        .attr(
          'transform',
          'translate(' + this.margin + ',' + this.margin + ')'
        );
    }
  }

  drawBars(data: Friend[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d: any) => d.name))
      .padding(0.2);

    const colors = d3
      .scaleOrdinal()
      .domain(this.friends.map((d) => d.name))
      .range(['#8a00d4', '#d527b7', '#f782c2', '#f9c46b', '#e3e3e3']);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-25)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 100]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.name))
      .attr('y', (d: any) => y(d.age))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.age))
      .attr('fill', (d: any, i: any) => colors(i));
  }
}
