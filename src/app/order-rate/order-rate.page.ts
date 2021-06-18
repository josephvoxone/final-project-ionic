import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-rate',
  templateUrl: './order-rate.page.html',
  styleUrls: ['./order-rate.page.scss'],
})
export class OrderRatePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  star: any = {
    rate_taste: 0, rate_time: 0, rate_work: 0
  }

  ngOnInit() {
    this.star.id_htrans = this.route.snapshot.paramMap.get('id');
  }

  logRatingChange(rating) {
    console.log("changed rating: ", rating);
  }

  goFavor() {
    localStorage.setItem("passing", JSON.stringify(this.star));
    this.navCtrl.navigateForward('order-favor');
  }

}
