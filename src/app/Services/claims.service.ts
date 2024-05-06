import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstUtils } from './UrlList';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  Claims_api_url =ConstUtils.ADMIN_API_CLAIMS
 token:any
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')

  }


  getAllClaims(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
      return this.http.get<any>(`${this.Claims_api_url}/all`,{headers});
  }
  createClaims(data: any) {
    console.log('add active')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<any>(`${this.Claims_api_url}/create`, data, { headers });
  }
  approveClaim(claim,id){
    console.log('add active')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.put<any>(`${this.Claims_api_url}/${id}/status?newState=Approved`, claim, { headers });
  }
  rejectClaim(claim,id){
    console.log('add active')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.put<any>(`${this.Claims_api_url}/${id}/status?newState=Rejected`, claim, { headers });
  }
    // Update an existing Claims by ID
    updateClaims(id:number,data: any) {
      console.log('update active')

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.put<any>(`${this.Claims_api_url}/${id}`, data, { headers });
    }
  
    // Delete a Claims by ID
    deleteClaims(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.delete<any>(`${this.Claims_api_url}/${id}`, { headers });
    }
  
    // Get a Claims by ID
    getClaimsById(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.get<any>(`${this.Claims_api_url}/${id}`, { headers });
    }
}
