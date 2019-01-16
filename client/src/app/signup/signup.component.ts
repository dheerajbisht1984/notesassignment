import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CommonserviceService} from './../commonservice.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  public globalObj: any= {};

  constructor(private myService: CommonserviceService,private router: Router) {
    let userId = localStorage.getItem('id');
    if(userId){
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern("/^[a-zA-Z]*$/")]),
      password: new FormControl('', [Validators.required]),
      conformPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(formValue){
      if(formValue.password != formValue.conformPassword){
        this.globalObj.message = "Password not equal to conform password";
        setTimeout(()=>{
          this.globalObj.message = '';
        },3000);
            return;
      }

      let param = {
        username: formValue.username,
        password: formValue.password,
        status: 'Active',
      };
      let url = 'user/createuser';
      this.myService.apiRequest(url,param).subscribe(response =>{
        let res: any = response;
        this.globalObj.message = res.response.message;
        setTimeout(()=>{
          this.globalObj.message = '';
          if(res.response.status == '200'){
            this.router.navigate(["/login"]);
          }
        },3000);
        this.signUpForm.patchValue({username:'',password:'',conformPassword:''});

      });

  }

}
