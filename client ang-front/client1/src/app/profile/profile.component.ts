import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServiceService} from '../service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  names = [];
  form: FormGroup;


  constructor(private router: Router, private service: ServiceService) {
  }

  // this.form = new FormGroup({
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required)
  // });
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      content: new FormControl()
    });
  }

  // ngOnInit() {
  //   this.form = new FormGroup({
  //     email: new FormControl('', Validators.required),
  //     password: new FormControl('', Validators.required)
  //   });
  // }


  myLogout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  foo() {
    // const post = {
    //   title: this.form.controls.title.value,
    //   description: this.form.controls.description.value,
    //   content: this.form.controls.content.value
    // };
    localStorage.clear();
    this.router.navigate(['using']);
    this.service.adName(this.form.value).subscribe(
      () => {
      },
      (err) => {
      })
    this.names.push();
    console.log(this.form.controls.title.value);
  }
}
