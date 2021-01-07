import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {User} from './../model/user'
import {UserService} from './../service/user.service'
import {NgForm,Validators,FormGroup,FormBuilder,ReactiveFormsModule} from '@angular/forms'
import { Router } from "@angular/router";
import {CityMaster} from './../model/city-master';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public fb: FormBuilder,public service:UserService,private router:Router,private toastr: ToastrService) { }
  myForm: FormGroup;
  CityMaster: CityMaster[] = [];
   
  ngOnInit(): void {

    this.reactiveForm()
    this.loadcities();
  }
  
  reactiveForm() {
    this.myForm = this.fb.group({
      FirstName: ['', [Validators.required,Validators.maxLength(100)]],
      LastName: ['', [Validators.required,Validators.maxLength(100)]],
      CityId: [this.CityMaster,[Validators.required] ],
      PhoneNumber: ['', [Validators.required,Validators.maxLength(10)]],
      DateCreated:new Date()
      
    
    })
  }
  loadcities()
  {
    
    this.service.GetCitylist().subscribe(
      list => {
        
        this.CityMaster=list;
        
      });
  }
  submitForm() {
    if (this.myForm.invalid) {
      return;
   }
    this.service.postEmployeedetails(this.myForm.value).subscribe(
      res=>{
 
        this.toastr.success("Employee Created Successfully...")
          
        this.router.navigate(['employeelist']);
        /////this.router.navigate();
        
      },
      err=>{
 
       debugger;
       this.toastr.error("Error in Creating employee record!!")
        console.log(err);
      }
 
     )
  }
  public errorHandling = (control: string, error: string) => {
    debugger;
    return this.myForm.controls[control].hasError(error);
  }
}
