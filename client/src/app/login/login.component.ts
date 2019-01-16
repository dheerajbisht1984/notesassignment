import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CommonserviceService} from './../commonservice.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  public globalObj: any = {};

  constructor(private myService: CommonserviceService,private router: Router) {
    let userId = localStorage.getItem('id');
    if(userId){
      this.router.navigate(["/home"]);
    }
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern("/^[a-zA-Z]*$/")]),
      password: new FormControl('', [Validators.required])
  });
  }

  onSubmit(formValue){
    let param = {
      username: formValue.username,
      password: formValue.password
    };
    let url = 'user/login';
    this.myService.apiRequest(url,param).subscribe(response =>{
      let res: any = response;
      this.globalObj.message = res.response.message;
      if(res.response.status == '200'){
        localStorage.setItem('id',res.response.id);
        this.router.navigate(["/home"]);
      }
      setTimeout(()=>{
        this.globalObj.message = '';

      },3000);
      //this.loginForm.patchValue({username:'',password:''});

    });
  }

}
