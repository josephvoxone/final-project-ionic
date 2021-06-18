import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  user:any = {};

  constructor(private userCervice:UserService) { }

  ngOnInit() {
  }

  async loginApps(){
    this.userCervice.login(this.user);
  }


}
