import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) { }

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

  // ITEM SERVICE
  public loadItem(kueri = '') {
    // id_kategori, id_item, id_label, search(like item.name)
    return new Promise((resolve) => {
      this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Master_Item/selectData?" + this.convertParamGet(kueri))
        .subscribe(data => {
          console.log(data["statusCode"] + " - Load Item");
          resolve(data);
        });
    })
  }
}
