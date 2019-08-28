import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }
  register(user) {
    console.log(user);
    return this.http.post('http://localhost:3000/users/register', user);
  }

  login(user) {
    return this.http.post('http://localhost:3000/users/login', user);
  }
  profile() {
    return this.http.get('http://localhost:3000/users/profile' );
  }
  adName(data) {
    return this.http.post( 'http://localhost:3000/api/post', data);
  }
  cli() {

  }

}
