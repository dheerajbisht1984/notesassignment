import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public signOut : any = false;
  constructor(private router: Router){
	if(localStorage.getItem('id'))
	  {
	 this.signOut = true;
	  }
   }

  signOut(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  };
}
