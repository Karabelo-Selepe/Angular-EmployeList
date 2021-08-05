import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './login/login.component';

const routes : Routes = [
  {path: 'employee-details', component: EmployeeDetailsComponent, canActivate: [AuthGuardGuard]},
  {path : '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
