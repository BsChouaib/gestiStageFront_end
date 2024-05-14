import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstUtils } from './UrlList';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  Teacher_api_url =ConstUtils.ADMIN_API_TEACHER
 token:any
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')

  }


  getAllTeachers(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
      return this.http.get<any>(`${this.Teacher_api_url}/all`,{headers}); 
     
/*         return this.http.get<any>(`${this.Teacher_api_url}/all`);
 */  }
  createTeacher(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<any>(`${this.Teacher_api_url}/create`, data, { headers });
  }

    // Update an existing Teacher by ID
    updateTeacher(id:number,data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.put<any>(`${this.Teacher_api_url}/update/${id}`, data, { headers });
    }
  
    // Delete a Teacher by ID
    deleteTeacher(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.delete<any>(`${this.Teacher_api_url}/delete/${id}`, { headers });
    }
  
    // Get a Teacher by ID
    getTeacherById(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.get<any>(`${this.Teacher_api_url}/${id}`, { headers });
    }
}
