import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { LoginResponse } from 'src/app/models/LoginResponse';



const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = 'http://localhost:8000/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    console.log("here");
    let response =  this.http.get<User[]>(`${this.apiURL}`);
    console.log("hello",response);
    return response;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/${id}`);
  }

  createUser(user: User): Observable<User> {
    console.log("user",user);
    const ans =  this.http.post<User>(`${this.apiURL}/register`, user,httpOptions);
    console.log(ans);
    return ans;
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURL}/${user._id}`, user,httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  loginUser(email: string, password: string): Observable<LoginResponse> {
    const user = { email, password };
    return this.http.post<LoginResponse>(`${this.apiURL}/auth/login`, user, httpOptions);
  }
}
