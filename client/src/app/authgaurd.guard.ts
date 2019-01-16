import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {CommonserviceService} from './commonservice.service';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdGuard implements CanActivate {

  constructor(private myService: CommonserviceService,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let id = localStorage.getItem('id');
      if(id){
        return true;
      }else{
        this.router.navigate(["/login"]);
        return false;
      }


  }
}
