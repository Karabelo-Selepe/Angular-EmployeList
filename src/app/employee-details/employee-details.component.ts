import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-details.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : [''],
      surname : [''],
      department : [''],
      position : [''],
      salary : ['']
    });

    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.surname = this.formValue.value.surname;
    this.employeeModelObj.department = this.formValue.value.department;
    this.employeeModelObj.position = this.formValue.value.position;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe((res: any) => {
      console.log(res);
      alert("Employee Added Sucessfully!");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      (    _err: any) => {
      alert("Something Went Wrong!");

    })
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })

  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe(res => {
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['surname'].setValue(row.surname);
    this.formValue.controls['department'].setValue(row.department);
    this.formValue.controls['position'].setValue(row.position);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.surname = this.formValue.value.surname;
    this.employeeModelObj.department = this.formValue.value.department;
    this.employeeModelObj.position = this.formValue.value.position;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res => {
      alert("Updated Successfully!");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
