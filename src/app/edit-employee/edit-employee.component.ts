import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { from } from 'rxjs';
import {User} from './../model/user'
import {UserService} from './../service/user.service'
import {NgForm,Validators,FormGroup,FormBuilder,ReactiveFormsModule} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import {CityMaster} from './../model/city-master';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  emp:User;
  myForm: FormGroup;
  CityMaster: CityMaster[] = [];
  selectedValue: number;
  
  constructor(public fb: FormBuilder,private route: ActivatedRoute,public service:UserService,private location: Location,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmployee();
    this.loadcities();
    this.reactiveForm();
    
    ////this.selectedValue=1;
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      Id:[],
      FirstName: ['', [Validators.required,Validators.maxLength(100)]],
      LastName: ['', [Validators.required,Validators.maxLength(100)]],
      CityId: [this.CityMaster],
      PhoneNumber: ['', [Validators.required,Validators.maxLength(10)]],
      DateCreated:new Date()
      
    
    })
  }
  loadcities()
  {
    
    this.service.GetCitylist().subscribe(
      list => {
        
        debugger;
        this.CityMaster=list;
        
      });
  }

 
getEmployee(): void {
    debugger;
    var id= +this.route.snapshot.paramMap.get('id');
    this.service.getemployeebyId(id).subscribe(
     
      emp=>{ 
        debugger;
        this.myForm.setValue({
          Id:emp.Id,
          FirstName:emp.FirstName,
          LastName:emp.LastName,
          CityId:parseInt(emp.CityId),
          PhoneNumber:emp.PhoneNumber,
          DateCreated:new Date()
          
        
        })
        
        this.selectedValue=parseInt(emp.CityId);
      });
  }

  submitForm() {
    if(this.myForm.invalid)
    {
      return;
    }
    
    this.service.putEmployeeDetail(this.myForm.value).subscribe(
      res=>{
 
        this.toastr.success("Employee Update Successfully...")
        
       this.router.navigate(['employeelist']);
      
        
      },
      err=>{
        debugger;
        this.toastr.error("Error in updating employee record!!")
        console.log(err);
      }
 
     )
  }
  public errorHandling = (control: string, error: string) => {
   
    return this.myForm.controls[control].hasError(error);
  }
}
