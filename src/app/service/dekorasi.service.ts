import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DekorasiService {

  constructor(
    private http: HttpClient
  ) { }


  public dekorOrder:any = {};

  convertParamGet(httpData: any) {
    let result_convert_array = "";
    if (httpData != []) {
      let convert_array = [];
      Object.keys(httpData).forEach(function (key) {
        let val = httpData[key];
        if (httpData[key] != undefined && httpData[key] != "" && httpData[key] != null) {
          let string_result_convert = key + "=" + httpData[key];
          convert_array.push(string_result_convert);
        }
      });
      result_convert_array = "&" + convert_array.join("&");
    }
    return result_convert_array;
  }


  public loadDecor(kueri = '') {
    // id, name, desc, image, search(like name)
    return new Promise((resolve) => {
      this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Master_Decoration/selectData?" + this.convertParamGet(kueri))
        .subscribe(data => {
          console.log("Berhasil Load Dekorasi");
          resolve(data);
        });
    })
  }
}
