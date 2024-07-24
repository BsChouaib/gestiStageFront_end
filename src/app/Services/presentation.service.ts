import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstUtils } from './UrlList';

@Injectable({
  providedIn: 'root'
})
export class PresentaionService {

  Presentation_api_url =ConstUtils.STUDENT_API_PRESENTATION
 token:any
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')

  }


  getAllPresentations(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

   //   return presentations 
     
       return this.http.get<any>(`${this.Presentation_api_url}/all`, { headers });
  }
  createPresentation(id:number,data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<any>(`${this.Presentation_api_url}/create/${id}`, data, { headers });
  }

    // Update an existing Presentation by ID
    updatePresentation(id:number,data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.put<any>(`${this.Presentation_api_url}/${id}`, data, { headers });
    }
    updatePresentationStatus(id:number,data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.put<any>(`${this.Presentation_api_url}/${id}/status?newState=${data}`, data, { headers });
    }
    // Delete a Presentation by ID
    deletePresentation(id: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.delete<any>(`${this.Presentation_api_url}/delete/${id}`, { headers });
    }
  
    // Get a Presentation by ID
    getPresentationById(id: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
  
      return this.http.get<any>(`${this.Presentation_api_url}/${id}`, { headers });
    }
}

const presentations = [
  {
    presentationId: 1,
    presentationDate: new Date('2024-07-15'),
        presentationStartTime: new Date('2024-07-15T09:00:00'),
        presentationEndTime: new Date('2024-07-15T10:00:00'),
    location: 'Room A',
    presentationTitle: 'Implementation of Blockchain Technology for Secure Transactions',
    result: 'Done',
    mention: 'Excellent',
    moyenne: 18.5,
    studentName: 'John Doe',
    encadrant: 'Dr. Alice Smith',
    juryList: ['Prof. John Brown', 'Dr. Emma Wilson'],
    juryDescription: 'Expert in blockchain and cryptographic security.'
  },
  {
    presentationId: 2,
    presentationDate: new Date('2024-07-17'),
        presentationStartTime: new Date('2024-07-17T11:00:00'),
        presentationEndTime: new Date('2024-07-17T12:00:00'),
    location: 'Room B',
    presentationTitle: 'Developing a Machine Learning Model for Predictive Analytics',
    result: 'Done',
    mention: 'Good',
    moyenne: 15.0,
    studentName: 'Jane Smith',
    encadrant: 'Prof. Mark Taylor',
    juryList: ['Dr. Lucas Miller', 'Prof. Olivia Johnson'],
    juryDescription: 'Specialists in machine learning and data science.'
  },
  {
    presentationId: 3,
    presentationDate: new Date('2024-07-18'),
    presentationStartTime: new Date('2024-07-18T12:00:00'),
    presentationEndTime: new Date('2024-07-18T13:00:00'),
    location: 'Room C',
    presentationTitle: 'Design and Development of an E-Commerce Platform',
    result: 'In progress',
    mention: null,
    moyenne: null,
    studentName: 'Michael Johnson',
    encadrant: 'Dr. Linda White',
    juryList: ['Prof. William Davis', 'Dr. Sophia Martinez'],
    juryDescription: null
  },
  {
    presentationId: 4,
    presentationDate: new Date('2024-07-19'),
        presentationStartTime: new Date('2024-07-19T13:00:00'),
        presentationEndTime: new Date('2024-07-19T14:00:00'),
    location: 'Room D',
    presentationTitle: 'Creating a Cybersecurity Framework for Small Businesses',
    result: 'Done',
    mention: 'Very Good',
    moyenne: 16.5,
    studentName: 'Emily Davis',
    encadrant: 'Prof. Richard Clark',
    juryList: ['Dr. Barbara Lewis', 'Prof. Kevin Walker'],
    juryDescription: 'Specialists in cybersecurity and small business frameworks.'
  },
  {
    presentationId: 5,
    presentationDate: new Date('2024-07-20'),
        presentationStartTime: new Date('2024-07-20T14:00:00'),
        presentationEndTime: new Date('2024-07-20T15:00:00'),
    location: 'Room E',
    presentationTitle: 'Building a Cloud-Based Data Storage Solution',
    result: 'Done',
    mention: 'Excellent',
    moyenne: 19.0,
    studentName: 'David Wilson',
    encadrant: 'Dr. Michael Harris',
    juryList: ['Prof. Jennifer King', 'Dr. Christopher Scott'],
    juryDescription: 'Experts in cloud computing and data storage solutions.'
  },
  {
    presentationId: 6,
    presentationDate: new Date('2024-07-21'),
    presentationStartTime: new Date('2024-07-21T15:00:00'),
    presentationEndTime: new Date('2024-07-21T16:00:00'),
    location: 'Room F',
    presentationTitle: 'Enhancing User Experience with Augmented Reality in Mobile Applications',
    result: 'In progress',
    mention: null,
    moyenne: null,
    studentName: 'Laura Martinez',
    encadrant: 'Prof. Andrew Young',
    juryList: ['Dr. Nancy Thompson', 'Prof. George Gonzalez'],
    juryDescription: null
  },
  {
    presentationId: 7,
    presentationDate: new Date('2024-07-22'),
        presentationStartTime: new Date('2024-07-22T16:00:00'),
        presentationEndTime: new Date('2024-07-22T17:00:00'),
    location: 'Room G',
    presentationTitle: 'Developing an Internet of Things (IoT) System for Smart Homes',
    result: 'Failed',
    mention: 'Poor',
    moyenne: 9.5,
    studentName: 'James Anderson',
    encadrant: 'Dr. Patricia Jackson',
    juryList: ['Prof. Daniel Moore', 'Dr. Elizabeth White'],
    juryDescription: 'Bad presentation'
  },
  {
    presentationId: 8,
    presentationDate: new Date('2024-07-23'),
    presentationStartTime: new Date('2024-07-23T17:00:00'),
    presentationEndTime: new Date('2024-07-23T18:00:00'),
    location: 'Room H',
    presentationTitle: 'Automating Business Processes with Robotic Process Automation (RPA)',
    result: 'Done',
    mention: 'Very Good',
    moyenne: 17.0,
    studentName: 'Sarah Clark',
    encadrant: 'Prof. Robert Hall',
    juryList: ['Dr. Susan Martinez', 'Prof. Paul Robinson'],
    juryDescription: 'Specialists in RPA and business process automation.'
  },
  {
    presentationId: 9,
    presentationDate: new Date('2024-07-24'),
    presentationStartTime: new Date('2024-07-24T18:00:00'),
    presentationEndTime: new Date('2024-07-24T19:00:00'),
    location: 'Room I',
    presentationTitle: 'Creating a Real-Time Chat Application Using WebSocket',
    result: 'In progress',
    mention: null,
    moyenne: null,
    studentName: 'Brian Lopez',
    encadrant: 'Dr. Kenneth Young',
    juryList: ['Prof. Carol Hernandez', 'Dr. Charles Green'],
    juryDescription: null
  },
  {
    presentationId: 10,
    presentationDate: new Date('2024-07-21'),
    presentationStartTime: new Date('2024-07-21T15:00:00'),
    presentationEndTime: new Date('2024-07-21T16:00:00'),
    location: 'Room J',
    presentationTitle: 'Implementing a Virtual Private Network (VPN) for Secure Remote Access',
    result: 'Done',
    mention: 'Excellent',
    moyenne: 18.0,
    studentName: 'Megan Walker',
    encadrant: 'Prof. Donald Carter',
    juryList: ['Dr. Matthew Roberts', 'Prof. Angela Harris'],
    juryDescription: 'Specialists in VPN technology and network security.'
  }
];

