import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstUtils } from './UrlList';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  Student_api_url =ConstUtils.ADMIN_API_STUDENT
 token:any
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')

  }


  getAllStudents(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
      return this.http.get<any>(`${this.Student_api_url}/all`,{headers}); 
     
/*         return this.http.get<any>(`${this.Student_api_url}/all`);
 */  }
  createStudent(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<any>(`${this.Student_api_url}/create`, data, { headers });
  }

    // Update an existing Student by ID
    updateStudent(id:number,data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.put<any>(`${this.Student_api_url}/update/${id}`, data, { headers });
    }
  
    // Delete a Student by ID
    deleteStudent(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.delete<any>(`${this.Student_api_url}/delete/${id}`, { headers });
    }
  
    // Get a Student by ID
    getStudentById(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.get<any>(`${this.Student_api_url}/${id}`, { headers });
    }
}
