import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {PlatformLocation} from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  public commonUrl: any;

  constructor(private http: HttpClient, platformLocation: PlatformLocation) {
    this.commonUrl = (platformLocation as any).location.protocol + "//" + (platformLocation as any).location.hostname+":3000/api/";
   }

   apiRequest(requestUrl , params){
     let url = this.commonUrl+requestUrl;
    return this.http.post(url, params).pipe(map(
              (res: Response) => res
       ));
   }

   externalApiRequest(requestUrl){

//    const headers = new HttpHeaders();
//    headers.set("Access-Control-Allow-Origin", "*");
//    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
       let url = this.commonUrl+requestUrl;
     return this.http.get(requestUrl).pipe(map(
             (res: Response) => res
      ));
  }
}
