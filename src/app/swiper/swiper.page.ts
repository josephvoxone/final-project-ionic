import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.page.html',
  styleUrls: ['./swiper.page.scss'],
})
export class SwiperPage implements OnInit {
  
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    // autoplay:false,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    }
  };

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  cekSwipe(){
    localStorage.setItem("firstTime","false");
    this.navCtrl.navigateRoot('/tabs');
  }

}
