// Angular Import
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';


import Chart from 'chart.js/auto';



@Component({
  selector: 'app-default',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export default class DefaultComponent implements OnInit, AfterViewInit {
  @ViewChild('studentsBasedOnNationality') studentsBasedOnNationality!: ElementRef | undefined;
  @ViewChild('studentsBasedOnStudyField') studentsBasedOnStudyField!: ElementRef | undefined;
  @ViewChild('teachersBasedOnNationality') teachersBasedOnNationality!: ElementRef | undefined;
  @ViewChild('subjectBasedOnInternshipType') subjectBasedOnInternshipType!: ElementRef | undefined;
  @ViewChild('demandsBasedOnStatus') demandsBasedOnStatus!: ElementRef | undefined;
  @ViewChild('internShipsBasedOnStatus') internShipsBasedOnStatus!: ElementRef | undefined;
  @ViewChild('presentationsBasedOnDate') presentationsBasedOnDate!: ElementRef | undefined;
  @ViewChild('claimsBasedOnStatus') claimsBasedOnStatus!: ElementRef | undefined;
  
  students:any = {
    basedOnNationality: 
    {
      data:[
        { title: "Tunisian", total: 120, estimation: 84.5 },
        { title: "Kenyan", total: 10, estimation: 7.04 },
        { title: "Libyan", total: 3, estimation: 2.06 },
        { title: "Malaysian", total: 1, estimation: 0.70 },
        { title: "Panamanian", total: 8, estimation: 5.63 }
      ],
      total: 100
    },
    basedOnStudyField: {
      data:[
        { title: "IRM-Opt. BD-IA", total: 36, estimation: 25.89 },
        { title: "IRM-Opt. IT finance", total: 20, estimation: 14.38 },
        { title: "IRM-Opt. Ingénierie des Systèmes d’Information et du Logiciel", total: 12, estimation: 8.63 },
        { title: "IRM-Opt. Ingénierie des Systèmes Embarqués et Mobiles", total: 4, estimation: 2.87 },
        { title: "Informatique, Réseaux et Multimédia (IRM)", total: 67, estimation: 48.20 }
      ],
      total: 100
    },
    total:100
  };
  teachers:any = {
    basedOnNationality: 
    {
      data:[
        { title: "Tunisian", total: 40, estimation: 28.57 },
        { title: "Tunisian", total: 12, estimation: 8.57 },
        { title: "Italian", total: 88, estimation: 62.86 }
      ],
      total: 140
    },
    total:140
  };
  subjects:any = {
    basedOnInternshipType: 
    {
      data:[
        { title: "IT", total: 12, estimation: 12.00 },
        { title: "IOT", total: 88, estimation: 88.00 }
      ],
      total: 100
    },
    total:100
  };
  demands:any = {
    basedOnStatus: 
    {
      data:[
        { title: "Done", total: 19, estimation: 19.00 },
        { title: "In Progress", total: 1, estimation: 1.00 },
        { title: "Pending", total: 80, estimation: 80.00 }
      ],
      total: 100
    },
    total:100
  };
  internships:any = {
    basedOnStatus: 
    {
      data:[
        { title: "Done", total: 19, estimation: 19.00 },
        { title: "In Progress", total: 1, estimation: 1.00 },
        { title: "Pending", total: 80, estimation: 80.00 }
      ],
      total: 100
    },
    total:100
  };
  presentations:any = {
    basedOnDate: 
    {
      data:[
        { title: "Done", total: 15, estimation: 15.00 },
        { title: "In Progress", total: 40, estimation: 40.00 },
        { title: "Pending", total: 45, estimation: 45.00 }
      ],
      total: 100
    },
    total:100
  };
  claims:any = {
    basedOnStatus: 
    {
      data:[
        { title: "Accepted", total: 12, estimation: 12.00 },
        { title: "Pending", total: 78, estimation: 88.00 },
        { title: "Rejected", total: 9, estimation: 9.00 }
      ],
      total: 99
    },
    total:99
  };
  // private props
  monthChart: any;
  yearChart: any;
  colorChart = ['#673ab7'];

  // Constructor
  constructor() {

  }
  ngAfterViewInit(): void {
    if (this.studentsBasedOnNationality) {
      const ctx = this.studentsBasedOnNationality!.nativeElement.getContext('2d');
      const studentsBasedOnNationality = this.students.basedOnNationality.data.map(item => ({
        label: item.title,
        data: item.estimation,
        backgroundColor: this.getRandomColor()
      }));
      
      this.renderPieChart(ctx,studentsBasedOnNationality);
    } 
    if (this.studentsBasedOnStudyField) {
      const ctx = this.studentsBasedOnStudyField!.nativeElement.getContext('2d');
      const studentsBasedOnStudyField = this.students.basedOnStudyField.data.map(item => ({
        label: item.title,
        data: item.total,
        backgroundColor: this.getRandomColor()
      }));
      this.renderPieChart(ctx,studentsBasedOnStudyField);
    } 
    
    if (this.teachersBasedOnNationality) {
      const ctx = this.teachersBasedOnNationality!.nativeElement.getContext('2d');
      const teachersBasedOnNationality = this.teachers.basedOnNationality.data.map(item => ({
        label: item.title,
        data: item.total,
        backgroundColor: this.getRandomColor()
      }));
      
      this.renderPieChart(ctx,teachersBasedOnNationality);
    } 
    if (this.subjectBasedOnInternshipType) {
      const ctx = this.subjectBasedOnInternshipType!.nativeElement.getContext('2d');
      const subjectBasedOnInternshipType = this.subjects.basedOnInternshipType.data.map(item => ({
        label: item.title,
        data: item.total,
        backgroundColor: this.getRandomColor()
      }));
      
      this.renderPieChart(ctx,subjectBasedOnInternshipType);
    } 
    if (this.demandsBasedOnStatus) {
      const ctx = this.demandsBasedOnStatus!.nativeElement.getContext('2d');
      const demandsBasedOnStatus = this.demands.basedOnStatus.data.map(item => ({
        label: item.title,
        data: item.total,
        backgroundColor: this.getRandomColor()
      }));
      
      this.renderPieChart(ctx,demandsBasedOnStatus);
    } 
    if (this.internShipsBasedOnStatus) {
      const ctx = this.internShipsBasedOnStatus!.nativeElement.getContext('2d');
      const internShipsBasedOnStatus = this.internships.basedOnStatus.data.map(item => ({
        label: item.title,
        data: item.total,
        backgroundColor: this.getRandomColor()
      }));
      
      this.renderPieChart(ctx,internShipsBasedOnStatus);
    } 
    if (this.presentationsBasedOnDate) {
      const ctx = this.presentationsBasedOnDate!.nativeElement.getContext('2d');
      const presentationsBasedOnDate = this.presentations.basedOnDate.data.map(item => ({
        label: item.title,
        data: item.total,
        backgroundColor: this.getRandomColor()
      }));
      
      this.renderPieChart(ctx,presentationsBasedOnDate);
    } 
    if (this.claimsBasedOnStatus) {
      const ctx = this.claimsBasedOnStatus!.nativeElement.getContext('2d');
      const claimsBasedOnStatus = this.claims.basedOnStatus.data.map(item => ({
        label: item.title,
        data: item.total,
        backgroundColor: this.getRandomColor()
      }));
      
      this.renderPieChart(ctx,claimsBasedOnStatus);
    } 
  }
  renderPieChart(ctx:any,data:any) {
    
    

    new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: data.map(item => item.data),
          backgroundColor: data.map(item => item.backgroundColor),
          label: 'Number of Students Based on Nationality'
        }],
        labels: data.map(item => item.label)
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem: any) {
                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
              }
            }
          }
        }
      }
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngOnInit(): void {
    // This.ngAfterViewInit();
  }
}
