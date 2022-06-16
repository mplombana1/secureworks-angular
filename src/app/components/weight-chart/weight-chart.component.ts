import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, SimpleChanges, AfterViewInit, SimpleChange } from '@angular/core'
import * as d3 from 'd3';
import { Friend } from 'src/app/store/friend.model';
@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements OnChanges, AfterViewInit {
  @ViewChild('chart') chartContainer?: ElementRef;
  @Input() friends: Friend[] = []
  svg: any
  margin = 50;
  width = 600 - (this.margin * 1)
  height = 200 - (this.margin * 1)
  colors: any

  ngAfterViewInit(): void {
    this.drawSvg()
    this.drawBars(this.friends)
  }

  ngOnChanges(SimpleChanges: any) {
    const changes = SimpleChanges['friends'];
    let firstChange = changes.firstChange
    if (!firstChange) {
      this.friends = changes.currentValue;
      this.updateBars()
    }
  }
  updateBars() {
    if (this.chartContainer) {
      let element = this.chartContainer.nativeElement;
      this.svg = d3.select(element).selectChild().remove()
      console.log(this.friends)
      this.drawSvg()
      this.drawBars(this.friends)
    }
  }
  drawSvg() {
    if (this.chartContainer) {
      let element = this.chartContainer.nativeElement;
      this.svg = d3.select(element)
        .append('svg')
        .attr("width", this.width + (this.margin * 2))
        .attr("height", this.height + (this.margin * 2))
        .append("g")
        .classed('svg-conatiner', true)
        .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
      console.log(this.svg.select('svg'), 'svg...')
    }
  }

  drawBars(data: any[]) {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map((d: any) => d.name))
      .padding(0.2);

    const colors = d3.scaleOrdinal()
      .domain(this.friends.map(d => d.name))
      .range(["#343090", "#5f59f7", "#6592fd", "#44c2fd", "#8c61ff"]);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-25)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 300])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.name))
      .attr("y", (d: any) => y(d.weight))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.weight))
      .attr('fill', (d: any, i: any) => (colors(i)))
  }
}
