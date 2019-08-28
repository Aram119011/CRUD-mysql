import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  email: string;

  constructor(private service: ServiceService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  reg() {
    this.service.login(this.form.value).subscribe(data => {
      // this.router.navigate(['profile']);
      // console.log(data['token']);
      if (data['success']) {
        localStorage.setItem('jwt_token', data['token']);
        this.router.navigate(['/profile']);
        // console.log(data['token']);
      } else {
        this.router.navigate(['login']);
      }
    });

  }

}
