import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private http: HttpClient
  ) { }

  async insertData(review) {
    return new Promise(async (resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Master_Review/insertDataAllData", JSON.stringify(review))
        .subscribe((data) => {
          if (data["result"]) {
            console.log(data); resolve(data);
          }
        }, error => {
          reject("Gagal Mengirim Data");
          console.log(error);
        });
    });
  }
}
