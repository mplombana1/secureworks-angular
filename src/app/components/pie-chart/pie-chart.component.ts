import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, SimpleChanges, AfterViewInit, SimpleChange} from '@angular/core'
import * as d3 from 'd3';
import { Friend } from 'src/app/store/friend.model';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnChanges, AfterViewInit {
  @ViewChild('chart') chartContainer?: ElementRef;
  @Input() friends: Friend[] = []
  svg: any
  margin = 50;
  width = 750 - (this.margin * 2)
  height = 400 - (this.margin * 2)

  setting = 'age'
  setting2 = 100 | 300;
  colors: any
    constructor() {}
  
    ngAfterViewInit(): void {
      this.drawSvg()
      this.drawBars(this.friends)
    }

    ngOnChanges(SimpleChanges: any) {
      const changes = SimpleChanges['friends'];
      let firstChange = changes.firstChange
      if (!firstChange){
        this.friends = changes.currentValue;

        // this.drawBars(currentValue)
        this.updateBars()
      }
   
    }

    changeCategory(){
      this.setting = this.setting.valueOf() == 'age' ? 'weight' : 'age'
      this.setting2 = this.setting2 == 300 ? 100 : 300  ;
      
      // this.setting.val(this.setting.val() == 'string1' ? 'string2' : 'string1');
      this.updateBars()
    }

  updateBars(){
    if (this.chartContainer){
      let element = this.chartContainer.nativeElement;
      this.svg = d3.select(element).selectChild().remove()
      console.log(this.friends)
      this.drawSvg()
      this.drawBars(this.friends)
      console.log('🚀 : this.svg ', this.svg )
     
    }
    
  }
  drawSvg() {
    if( this.chartContainer) {
      let element = this.chartContainer.nativeElement;
      this.svg = d3.select(element)
      .append('svg')
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
      console.log(this.svg.select('svg'), 'svg...')
    }
  }

  drawBars(data: any[]) {
     console.log('🚀 : data', data)
     // Create the X-axis band scale
     const x = d3.scaleBand()
     .range([0, this.width])
     .domain(data.map((d: any) => d.name))
     .padding(0.2);
 

     const colors = d3.scaleOrdinal()
    .domain(this.friends.map(d => d.name))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
     
     // Draw the X-axis on the DOM
     this.svg.append("g")
     .attr("transform", "translate(0," + this.height + ")")
     .call(d3.axisBottom(x))
     .selectAll("text")
     .attr("transform", "translate(-10,0)rotate(-45)")
     .style("text-anchor", "end");
 
     // Create the Y-axis band scale
     const y = d3.scaleLinear()
     .domain([0, this.setting2])
     .range([this.height, 0]);
 
     // Draw the Y-axis on the DOM
     this.svg.append("g")
     .call(d3.axisLeft(y));
    //  var color = d3.scale.ordinal().range(["#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
     // Create and fill the bars
     this.svg.selectAll("bars")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", (d:any) => x(d.name))
     .attr("y", (d:any) => y(d[this.setting]))
     .attr("width", x.bandwidth())
     .attr("height", (d: any) => this.height - y(d[this.setting]))
     .attr('fill', (d: any, i: any) => (colors(i)))
  }



}
