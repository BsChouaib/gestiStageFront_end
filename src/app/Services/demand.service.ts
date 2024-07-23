import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstUtils } from './UrlList';

@Injectable({
  providedIn: 'root'
})
export class DemandService {

  Demand_api_url = ConstUtils.STUDENT_API_DEMANDE
  token: any
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')

  }


  getAllDemand() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get<any>(`${this.Demand_api_url}/all`, { headers });

    /*       return this.http.get<any>(`${this.Demand_api_url}/all`);
     */
  }
  getAllDemandST() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get<any>(`${this.Demand_api_url}/userDemand`, { headers });
  }
  createDemand(data: any,formdata:FormData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.post<any>(`${this.Demand_api_url}/create?subjectId=${data?.subjectId}`,formdata, { headers });
  }
  approveDemand( id) {
    console.log(this.token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.put<any>(`${this.Demand_api_url}/${id}/status?newState=Approved`, {},{ headers });
  }
  rejectDemand( id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.put<any>(`${this.Demand_api_url}/${id}/status?newState=Rejected`,{}, { headers });
  }
  // Update an existing Demand by ID
  updateDemand( data: any,formdata:FormData) {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.put<any>(`${this.Demand_api_url}/${data.id}?subjectId=${data.subjectId}`, formdata, { headers });
  }

  // Delete a Demand by ID
  deleteDemand(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.delete<any>(`${this.Demand_api_url}/${id}`, { headers });
  }

  // Get a Demand by ID
  getDemandById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<any>(`${this.Demand_api_url}/${id}`, { headers });
  }
  downloadResume(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.Demand_api_url}/download/resume/${id}`, { headers ,responseType: 'blob' as 'blob' });
  }
  downloadCoverLetter(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get(`${this.Demand_api_url}/download/letter/${id}`, { headers,responseType: 'blob' as 'blob' });
  }
}
