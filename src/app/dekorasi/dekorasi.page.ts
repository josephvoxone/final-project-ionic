import { Component, OnInit } from '@angular/core';
import { DekorasiService } from '../service/dekorasi.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dekorasi',
  templateUrl: './dekorasi.page.html',
  styleUrls: ['./dekorasi.page.scss'],
})
export class DekorasiPage implements OnInit {

  items = []; tipe: any; data: any;
  kueri: any = { search: '' }; loading: boolean = false; found: boolean = true;
  constructor(
    private decorService: DekorasiService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.tipe = this.route.snapshot.paramMap.get('tipe');

    this.decorService.loadDecor().then((resp) => {
      if (resp["success"]) { this.data = resp["result"]; this.items = this.data; }
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  goDetail(item) {
    localStorage.setItem("passing", JSON.stringify(item));
    this.navCtrl.navigateForward(['/dekorasi-detail', { tipe: this.tipe }]);
  }

  findItem() {
    this.items = null;
    if (this.kueri.search != '') {
      this.loading = true;
      this.decorService.loadDecor(this.kueri).then((resp) => {
        if (resp["success"]) { this.data = resp["result"]; this.found = true; this.items = this.data } else { this.found = false; }
        this.loading = false;
      });
    } else if (this.kueri.search == "") {
      this.ngOnInit();
    }
  }

}
