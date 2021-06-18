import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  public loadCompany() {
    return new Promise((resolve, reject) => {
      this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Master_Company/selectData?id=" + 1)
        .subscribe(data => {
          resolve(data); localStorage.setItem("dataCompany", JSON.stringify(data["result"][0]));
        }, async error => {
          reject("Jaringan tidak stabil"); console.log(error);
        });
    });
  }
}
