import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  tipe: any;

  ngOnInit() {
    this.tipe = this.route.snapshot.paramMap.get('tipe');
  }

  back() {
    this.navCtrl.back();
  }

}
