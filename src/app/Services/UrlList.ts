import { environment } from '../../environments/environment';
export const baseUrl = environment.apiUrl ;


export const ConstUtils = {
    AUTH_API_Login: baseUrl + '/api/auth/login', 
    AUTH_API_Registre: baseUrl + '/api/auth/register', 
    ADMIN_API_SUBJECT: baseUrl + '/api/subject', 
    ADMIN_API_CLAIMS: baseUrl + '/api/claim', 
    ADMIN_API_TEACHER: baseUrl + '/api/teacher', 
    ADMIN_API_STUDENT: baseUrl + '/api/student', 
    STUDENT_API_DEMANDE: baseUrl + '/api/demand', 
    STUDENT_API_PRESENTATION: baseUrl + '/api/presentation',
    STUDENT_API_INTERNSHIP: baseUrl + '/api/internship',
    API_STUDYFIELD: baseUrl + '/api/StudyField', 
    NOTIF_API:baseUrl + '/api/notification' 


}
