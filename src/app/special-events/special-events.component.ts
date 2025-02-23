import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms';
import { model } from './model';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  standalone : false
})
export class SpecialEventsComponent implements OnInit 
{  
  specialEvents : any[] = []
  formValue! : FormGroup
    events : any[] = []
    counter : number;
    allStudentData : any;
    modelobj : model = new model;

  constructor(private _eventService: EventService,
              private _router: Router, private formbuilder: FormBuilder) { }

  ngOnInit() 
  {
    this._eventService.getSpecialEvents()
      .subscribe(
        res => this.specialEvents = res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )

      this.formValue = this.formbuilder.group({
        name : [''],
        email : [''],
        mobile : [''],
        prevBatch:[''],
        RID : ['']
      })

      this.getAllData()
  }

  onClickAdmission(cbatch : string)
  {
    this.formValue.reset();
    this.modelobj._id = this.idGenerator()
    this.modelobj.batch = cbatch
  }

  takeAdmission()
  {
    this.modelobj.name = this.formValue.value.name;
    this.modelobj.email = this.formValue.value.email;
    this.modelobj.mobile = this.formValue.value.mobile;
    this.modelobj.prevBatch = this.formValue.value.prevBatch;
    this.modelobj.RID = this.formValue.value.RID;
    this._eventService.postAdmissionS(this.modelobj).subscribe(res => {
      console.log(res);
      alert("Admission is Successful");
      this.formValue.reset();

      let ref= document.getElementById('close');
      ref?.click();

      this.getAllData();

    }, err=>{
      console.log(err);
      alert("Restaurent Added Failed!");
    })
  }

  getAllData()
  {
    this._eventService.getStudentsS().subscribe(res => {
      this.allStudentData= res;
    }, err=>{
      console.log(err);
    })
  }


  idGenerator() {//
    if (!this.allStudentData || this.allStudentData.length === 0) {
      // If there is no data, start with ID 1
      return (this.counter = 1);
    }
  
    let maxId = 0;
  
    for (let i = 0; i < this.allStudentData.length; i++) {
      if (this.allStudentData[i]._id > maxId) {
        maxId = this.allStudentData[i]._id;
      }
    }
  
    // Increment the highest ID found
    return (this.counter = ++maxId);
  }

}


