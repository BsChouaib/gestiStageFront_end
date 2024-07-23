// angular import
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubjectAdminService } from 'src/app/Services/admin/subject-admin.service';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog,MatDialogModule} from '@angular/material/dialog';
import { FormDialogComponent } from './update-dialog/update-dialog.component';
import { DeleteSubjectDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddSubjectDialogComponent } from './add-dialog/add-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [SharedModule,MatTableModule,MatPaginator,MatMenuModule,MatIconModule,MatButtonModule,MatDialogModule,MatTooltipModule,CommonModule],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss'],
  providers:[SubjectAdminService]
})
export default class SamplePageComponent implements AfterViewInit,OnInit,OnDestroy{
  
  displayedColumns: string[] = ['title', 'description', 'internshipType', 'teacher','action'];
  dataSource :MatTableDataSource<any>;
  rows: number[] = Array.from({length: 30}, (_, i) => i + 1);

  constructor(private subjectService : SubjectAdminService, private dialog: MatDialog,  private toast: ToastrService
  ){

  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAllSubjects()
  }
  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }

  getAllSubjects(){
    this.subjectService.getAllSubject().subscribe({
      next:(res)=>{

       this.dataSource = new MatTableDataSource(res.data)
       this.dataSource.paginator = this.paginator
      },

      error:(err)=>{
          console.log(err)
      }
    })
  }
  updateSubject(subject){
    console.log('activ')
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data:subject,
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllSubjects()
      }
    });
  }
  deleteSubject(subject){
    const dialogRef = this.dialog.open(DeleteSubjectDialogComponent, {
      data:subject,
      width:'500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllSubjects()
      }
    });
  }
  addSubject(){
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllSubjects()
      }
    });
  }
  ngOnDestroy() {
    this.toast.clear()  }

   /*  generatePDF() {
      const data = document.getElementById('pdfContent');
      if (data) {
        html2canvas(data).then(canvas => {
          var imgWidth = 208;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;
          var margin = 10; // Adjust the margin as needed
          
          const contentDataURL = canvas.toDataURL('image/png')
          let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
          var position = 0;
    
          // Function to add content with margins
          const addContentWithMargin = () => {
            pdf.addImage(contentDataURL, 'PNG', margin, position + margin, imgWidth - 2 * margin, imgHeight - 2 * margin);
          };
    
          // Add first page with margin
          addContentWithMargin();
    
          // Check if content exceeds one page
          if (heightLeft > pageHeight) {
            while (heightLeft > pageHeight) {
              position -= (pageHeight - 2 * margin); // Move position to next page with margin
              heightLeft -= (pageHeight - 2 * margin); // Adjust remaining height
              // Add new page with margin
              pdf.addPage();
              addContentWithMargin();
            }
          }
          
          pdf.save('generated.pdf');
        });
      }
    } */
    
    

}
