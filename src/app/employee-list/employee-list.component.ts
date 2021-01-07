import { Component, OnInit,ViewChild ,AfterViewInit} from '@angular/core';
import {UserService} from './../service/user.service'
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from "@angular/router";
import { User } from '../model/user';
@Component({
  selector: 'employeelist',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  searchText;
  sortedData:any
  list:User[];
  Datasouce;
  displayedColumns: string[] =["FirstName","LastName","CityMaster.Name","PhoneNumber","actions"]
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;
  constructor(public service:UserService,private router:Router) { }

  ngOnInit(): void {
    this.loadEmployee();
  }
  onDelete(id)
  {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteemployee(id)
        .subscribe(() => {
          
          this.loadEmployee();
          
        },
          err => {
            
            console.log(err);
          })
    }
  }
  loadEmployee()
  {
    
    this.service.Getemployeelist().subscribe(
      list => {
        
        debugger;
        this.service.sortedData = new MatTableDataSource(list);
        this.service.sortedData.sort = this.sort;
      
        
      });
  }
  
  applyFilter() {
  
    this.service.sortedData.filter = this.searchKey;
  }
 

}
