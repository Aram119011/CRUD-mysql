import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private service: ServiceService, private router: Router) {
  }

  ngOnInit() {
  }

  reg() {
    this.service.register(this.form.value).subscribe(data => {
      // console.log(data)
      // this.router.navigate(['profile']);
      if (data['success']) {
        localStorage.setItem('jwt_token', data['token']);
        this.router.navigate(['profile']);
        // this.router.navigate(['login']);
        console.log(data['token']);
      }
    });
  }

}

// if (data['success']) {
//   localStorage.setItem('jwt_token', data['token']);
//   this.router.navigate(['profile']);
//   console.log(data['token']);
