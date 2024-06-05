import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstUtils } from './UrlList';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  StudyField_api_url =ConstUtils.API_STUDYFIELD
 token:any
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')

  }


  getAllStudyFields(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
      return this.http.get<any>(`${this.StudyField_api_url}/all`,{headers}); 
  }
  createStudyField(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<any>(`${this.StudyField_api_url}/create`, data, { headers });
  }
    // Update an existing StudyField by ID
    updateStudyField(id:number,data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.put<any>(`${this.StudyField_api_url}/${id}`, data, { headers });
    }
  
    // Delete a StudyField by ID
    deleteStudyField(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.delete<any>(`${this.StudyField_api_url}/${id}`, { headers });
    }
  
    // Get a StudyField by ID
    getStudyFieldById(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.get<any>(`${this.StudyField_api_url}/${id}`, { headers });
    }
}
