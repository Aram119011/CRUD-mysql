import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-using',
  templateUrl: './using.component.html',
  styleUrls: ['./using.component.css']
})
export class UsingComponent implements OnInit {

  constructor(private  service: ServiceService, private  router: Router) {
  }
  // private service: ServiceService, private router: Router
  ngOnInit() {
  }
  myLogout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
