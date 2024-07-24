import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstUtils } from './UrlList';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  Internship_api_url = ConstUtils.STUDENT_API_INTERNSHIP;
  Notif_api_url = ConstUtils.NOTIF_API;
  token: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  getAllInternships() {
    //  return internships
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get<any>(`${this.Internship_api_url}/all`, { headers });
  }

  // Update an existing Internship by ID
  updateInternship( data: any,formData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
/* &internshipJournal=${data.internshipJournal}&internshipReport=${data.internshipReport} */
    return this.http.put<any>(
      `${this.Internship_api_url}/update?dateDebut=${data.dateDebut}&dateFin=${data.dateFin}&id=${data.id}&newState=${data.state}&titre=${data.titre}`,
      formData,
      { headers }
    );
    //      return this.http.put<any>(`${this.Internship_api_url}/${id}?dateDebut=${data.dateDebut}&dateFin=${data.dateFin}`, data, { headers });
  }

  // Update a status of Internship by ID
  updateInternshipStatus(id: number, data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    return this.http.put<any>(`${this.Internship_api_url}/${id}/status?newState=${data}`, {}, { headers });
  }
  // Delete a Internship by ID
  deleteInternship(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.delete<any>(`${this.Internship_api_url}/delete/${id}`, { headers });
  }

  // Get a Internship by ID
  getInternshipById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<any>(`${this.Internship_api_url}/${id}`, { headers });
  }
  getRole(): any {
    return localStorage.getItem('role');
  }
  getAllNotif() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get<any>(`${this.Notif_api_url}/all`, { headers });
  }
}
const internships = [
  {
    internshipId: 1,
    internshipDate: new Date('2024-07-01'),
    internshipStartTime: new Date('2024-01-01T09:00:00'),
    internshipEndTime: new Date('2024-06-30T10:00:00'),
    location: 'Room A',
    internshipTitle: 'Implementation of Blockchain Technology for Secure Transactions',
    result: 'Done',
    mention: 'Excellent',
    moyenne: 18.5,
    studentName: 'John Doe',
    encadrant: 'Dr. Alice Smith',
    juryList: ['Prof. John Brown', 'Dr. Emma Wilson'],
    juryDescription: 'Expert in blockchain and cryptographic security.',
    internshipReport: { id: 1, fileName: 'Blockchain_Report.pdf' },
    internshipJournal: { id: 1, fileName: 'Blockchain_Journal.pdf' }
  },
  {
    internshipId: 2,
    internshipDate: new Date('2024-07-03'),
    internshipStartTime: new Date('2024-01-01T10:00:00'),
    internshipEndTime: new Date('2024-06-30T11:00:00'),
    location: 'Room B',
    internshipTitle: 'Developing a Machine Learning Model for Predictive Analytics',
    result: 'Done',
    mention: 'Good',
    moyenne: 15.0,
    studentName: 'Jane Smith',
    encadrant: 'Prof. Mark Taylor',
    juryList: ['Dr. Lucas Miller', 'Prof. Olivia Johnson'],
    juryDescription: 'Specialists in machine learning and data science.',
    internshipReport: { id: 2, fileName: 'ML_Report.pdf' },
    internshipJournal: { id: 2, fileName: 'ML_Journal.pdf' }
  },
  {
    internshipId: 3,
    internshipDate: new Date('2024-09-17'),
    internshipStartTime: new Date('2024-01-17T11:00:00'),
    internshipEndTime: new Date('2024-09-15T12:00:00'),
    location: 'Room C',
    internshipTitle: 'Design and Development of an E-Commerce Platform',
    result: 'In progress',
    mention: null,
    moyenne: null,
    studentName: 'Michael Johnson',
    encadrant: 'Dr. Linda White',
    juryList: ['Prof. William Davis', 'Dr. Sophia Martinez'],
    juryDescription: null,
    internshipReport: { id: 3, fileName: 'ECommerce_Report.pdf' },
    internshipJournal: { id: 3, fileName: 'ECommerce_Journal.pdf' }
  },
  {
    internshipId: 4,
    internshipDate: new Date('2024-07-11'),
    internshipStartTime: new Date('2024-01-11T12:00:00'),
    internshipEndTime: new Date('2024-07-01T13:00:00'),
    location: 'Room D',
    internshipTitle: 'Creating a Cybersecurity Framework for Small Businesses',
    result: 'Done',
    mention: 'Very Good',
    moyenne: 16.5,
    studentName: 'Emily Davis',
    encadrant: 'Prof. Richard Clark',
    juryList: ['Dr. Barbara Lewis', 'Prof. Kevin Walker'],
    juryDescription: 'Specialists in cybersecurity and small business frameworks.',
    internshipReport: { id: 4, fileName: 'Cybersecurity_Report.pdf' },
    internshipJournal: { id: 4, fileName: 'Cybersecurity_Journal.pdf' }
  },
  {
    internshipId: 5,
    internshipDate: new Date('2024-07-09'),
    internshipStartTime: new Date('2024-01-19T13:00:00'),
    internshipEndTime: new Date('2024-07-06T14:00:00'),
    location: 'Room E',
    internshipTitle: 'Building a Cloud-Based Data Storage Solution',
    result: 'Done',
    mention: 'Excellent',
    moyenne: 19.0,
    studentName: 'David Wilson',
    encadrant: 'Dr. Michael Harris',
    juryList: ['Prof. Jennifer King', 'Dr. Christopher Scott'],
    juryDescription: 'Experts in cloud computing and data storage solutions.',
    internshipReport: { id: 5, fileName: 'CloudStorage_Report.pdf' },
    internshipJournal: { id: 5, fileName: 'CloudStorage_Journal.pdf' }
  },
  {
    internshipId: 6,
    internshipDate: new Date('2024-07-20'),
    internshipStartTime: new Date('2024-01-20T14:00:00'),
    internshipEndTime: new Date('2024-07-18T15:00:00'),
    location: 'Room F',
    internshipTitle: 'Enhancing User Experience with Augmented Reality in Mobile Applications',
    result: 'In progress',
    mention: null,
    moyenne: null,
    studentName: 'Laura Martinez',
    encadrant: 'Prof. Andrew Young',
    juryList: ['Dr. Nancy Thompson', 'Prof. George Gonzalez'],
    juryDescription: null,
    internshipReport: { id: 6, fileName: 'ARUX_Report.pdf' },
    internshipJournal: { id: 6, fileName: 'ARUX_Journal.pdf' }
  },
  {
    internshipId: 7,
    internshipDate: new Date('2024-07-05'),
    internshipStartTime: new Date('2024-01-05T15:00:00'),
    internshipEndTime: new Date('2024-07-02T16:00:00'),
    location: 'Room G',
    internshipTitle: 'Developing an Internet of Things (IoT) System for Smart Homes',
    result: 'Failed',
    mention: 'Poor',
    moyenne: 9.5,
    studentName: 'James Anderson',
    encadrant: 'Dr. Patricia Jackson',
    juryList: ['Prof. Daniel Moore', 'Dr. Elizabeth White'],
    juryDescription: 'Bad internship',
    internshipReport: { id: 7, fileName: 'IoT_Report.pdf' },
    internshipJournal: { id: 7, fileName: 'IoT_Journal.pdf' }
  },
  {
    internshipId: 8,
    internshipDate: new Date('2024-07-12'),
    internshipStartTime: new Date('2024-01-12T16:00:00'),
    internshipEndTime: new Date('2024-07-06T17:00:00'),
    location: 'Room H',
    internshipTitle: 'Automating Business Processes with Robotic Process Automation (RPA)',
    result: 'Done',
    mention: 'Very Good',
    moyenne: 17.0,
    studentName: 'Sarah Clark',
    encadrant: 'Prof. Robert Hall',
    juryList: ['Dr. Susan Martinez', 'Prof. Paul Robinson'],
    juryDescription: 'Specialists in RPA and business process automation.',
    internshipReport: { id: 8, fileName: 'RPA_Report.pdf' },
    internshipJournal: { id: 8, fileName: 'RPA_Journal.pdf' }
  },
  {
    internshipId: 9,
    internshipDate: new Date('2024-07-23'),
    internshipStartTime: new Date('2024-01-23T17:00:00'),
    internshipEndTime: new Date('2024-07-20T18:00:00'),
    location: 'Room I',
    internshipTitle: 'Creating a Real-Time Chat Application Using WebSocket',
    result: 'In progress',
    mention: null,
    moyenne: null,
    studentName: 'Brian Lopez',
    encadrant: 'Dr. Kenneth Young',
    juryList: ['Prof. Carol Hernandez', 'Dr. Charles Green'],
    juryDescription: null,
    internshipReport: { id: 9, fileName: 'ChatApp_Report.pdf' },
    internshipJournal: { id: 9, fileName: 'ChatApp_Journal.pdf' }
  },
  {
    internshipId: 10,
    internshipDate: new Date('2024-07-04'),
    internshipStartTime: new Date('2024-01-01T18:00:00'),
    internshipEndTime: new Date('2024-07-01T19:00:00'),
    location: 'Room J',
    internshipTitle: 'Implementing a Virtual Private Network (VPN) for Secure Remote Access',
    result: 'Done',
    mention: 'Excellent',
    moyenne: 18.0,
    studentName: 'Megan Walker',
    encadrant: 'Prof. Donald Carter',
    juryList: ['Dr. Matthew Roberts', 'Prof. Angela Harris'],
    juryDescription: 'Specialists in VPN technology and network security.',
    internshipReport: { id: 10, fileName: 'VPN_Report.pdf' },
    internshipJournal: { id: 10, fileName: 'VPN_Journal.pdf' }
  }
];
