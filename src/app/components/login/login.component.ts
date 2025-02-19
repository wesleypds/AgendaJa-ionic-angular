import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent  implements OnInit {

  username: string = "";
  password: string = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  login() {
    if (this.username === "wesleypds" && this.password === "123") {
      this.router.navigateByUrl("/home");
    }
  }

}
