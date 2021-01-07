import { Injectable } from '@angular/core';
import {User} from './../model/user';
import {CityMaster} from './../model/city-master';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, of, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError , map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  serviceUrl: string = 'http://localhost:50219/employee';
  sortedData:any
  list:User[];
  constructor(private http:HttpClient,private router: Router) { }
  postEmployeedetails(data): Observable<any> {
   debugger;
    let API_URL=`${this.serviceUrl}/createemployee`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
      
  }
  GetCitylist():Observable<CityMaster[]>{
    let API_URL=`${this.serviceUrl}/citylist`;
    return this.http.get<CityMaster[]>(API_URL).pipe(catchError(this.error));;
    
    
  }
  Getemployeelist():Observable<User[]>{
    let API_URL=`${this.serviceUrl}/employeelist`;
    return this.http.get<User[]>(API_URL).pipe(catchError(this.error));;
    
    
  }
  deleteemployee(id): Observable<any> {

    let API_URL=`${this.serviceUrl}/`;
    return this.http.delete(API_URL+id)
      .pipe(
        catchError(this.error)
      )
      
  }
  getemployeebyId(id): Observable<any> {
  
    let API_URL=`${this.serviceUrl}/getemployeebyId/`;
    return this.http.get(API_URL+id)
      .pipe(
        catchError(this.error)
      )
      
  }
  putEmployeeDetail(data):Observable<any> {
    let API_URL=`${this.serviceUrl}/`;
    debugger;
    return this.http.put(API_URL + data.Id, data);
    
  }
  error(error: HttpErrorResponse) {
    let errorMessage = '';
     debugger;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error[0];
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
