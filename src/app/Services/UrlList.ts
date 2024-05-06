import { environment } from '../../environments/environment';
export const baseUrl = environment.apiUrl ;


export const ConstUtils = {
    AUTH_API_Login: baseUrl + '/api/auth/login', 
    AUTH_API_Registre: baseUrl + '/api/auth/register', 
    ADMIN_API_SUBJECT: baseUrl + '/api/subject', 
    ADMIN_API_CLAIMS: baseUrl + '/api/claim', 


}
