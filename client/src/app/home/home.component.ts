import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonserviceService} from './../commonservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  public alllist : any ;
  public listexist : boolean = false;

  constructor(private myService: CommonserviceService) { }

  ngOnInit() {this.notesList();
    
  }

notesList()
{

    
    let param = {"list": "all"};
    let url = 'notes/listnotes';
    this.myService.apiRequest(url,param).subscribe(details=>{
	const data: any = details;
      
      if(data.response_status.status==200)
        {
         if(data.response.length>0)
          {
            this.listexist = true;
            this.alllist = data.response;
          }
          else
            {
              this.listexist = false;
            }
        }
      else
        {
        alert("Error");
        }
    });
}

addNotesList(val)
{
   const param = {
      "name": val,
    };
   let url = "notes/addnotes";
    this.myService.apiRequest(url,param).subscribe(details => {
	const data: any = details;
      if(data.response_status.status==200)
        {
        
        this.notesList();
        }
      else
        {
        alert("Error");
        }
    });
}


}
