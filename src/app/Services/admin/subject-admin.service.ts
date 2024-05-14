import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstUtils } from '../UrlList';

@Injectable({
  providedIn: 'root'
})
export class SubjectAdminService {

  Subject_api_url =ConstUtils.ADMIN_API_SUBJECT
 token:any
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')

  }


  getAllSubject(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
      return this.http.get<any>(`${this.Subject_api_url}/all`,{headers}); 
      //return this.http.get<any>(`${this.Subject_api_url}/all`);

  }
  createSubject(data: any) {
    console.log('add active')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<any>(`${this.Subject_api_url}/create`, data, { headers });
  }
    // Update an existing subject by ID
    updateSubject(id:number,data: any) {
      console.log('update active')

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.put<any>(`${this.Subject_api_url}/${id}`, data, { headers });
    }
  
    // Delete a subject by ID
    deleteSubject(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.delete<any>(`${this.Subject_api_url}/${id}`, { headers });
    }
  
    // Get a subject by ID
    getSubjectById(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.get<any>(`${this.Subject_api_url}/${id}`, { headers });
    }
}
