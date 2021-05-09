import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
// import * as Chart from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  darkActive : boolean = true;

  constructor(
    private ref:ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.ref.detectChanges();
    Chart.register(...registerables); 
    this.drawChart();
    this.drawChartPie();

  }

  darkMode() {
    this.darkActive = ! this.darkActive;
    document.body.classList.toggle('dark');
    // console.log(event);
  }

  drawChart() {

    // var ctx = document.getElementById('myChart').getContext('2d');
    const canvas = <HTMLCanvasElement>document.getElementById('chart1');
    const ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive:true,
        maintainAspectRatio:false
      }
    });

  }

  drawChartPie() {

    // var ctx = document.getElementById('myChart').getContext('2d');
    const canvas = <HTMLCanvasElement>document.getElementById('chartPie');
    const ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [200, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio: false,
      }

      
       
    });

  }
}
