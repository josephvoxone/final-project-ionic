import { Component, OnInit, NgZone } from '@angular/core';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-tab-home',
  templateUrl: 'tab-home.page.html',
  styleUrls: ['tab-home.page.scss'],
})
export class TabHomePage implements OnInit {

  user: any = {};

  slideOpts = {
    initialSlide: 0,
    centeredSlides: true,
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  };

  
  constructor(
    private zone: NgZone,
    private CompanyService: CompanyService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.zone.run(async () => {
      this.CompanyService.loadCompany(); //Init Company

      this.user = JSON.parse(localStorage.getItem("dataUser"));
      if (this.user.gender == 0 && this.user.image == "") {
        this.user.image = "assets/local/avatar/avatar-0.png";
      } else if (this.user.gender == 1 && this.user.image == "") {
        this.user.image = "assets/local/avatar/avatar-1.png";
      }
    });
  }

}
