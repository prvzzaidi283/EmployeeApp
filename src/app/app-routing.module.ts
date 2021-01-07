import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import {EmployeeListComponent} from './employee-list/employee-list.component'
import{  EditEmployeeComponent} from './edit-employee/edit-employee.component'
import { from } from 'rxjs';
const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'employeelist', component: EmployeeListComponent },
  {path:'editemployee/:id',component:EditEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
