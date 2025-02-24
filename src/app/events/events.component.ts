import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { model } from './model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  standalone : false
})
export class EventsComponent implements OnInit 
{

  formValue! : FormGroup
  events : any[] = []
  counter : number = 0; //*
  allStudentData : any;
  modelobj : model = new model;
  isAdmissionFull : boolean = false;

  constructor(private _eventService: EventService, private formbuilder: FormBuilder) { }


  ngOnInit() 
  {
    this._eventService.getEvents()
      .subscribe(
        res => this.events = res,
        err => console.log(err)
      )

      this.formValue = this.formbuilder.group({
        name : [''],
        email : [''],
        mobile : ['']
      })

      this.getAllData()
  }

  onClickAdmission(cbatch : string)
  {
    this.getAllData();

    
    this.formValue.reset();
    this.modelobj._id = this.idGenerator()
    this.modelobj.batch = cbatch

    console.log('Current modelobj._id:', this.modelobj._id);

    if (this.modelobj._id >= 10) {
      alert("Admission Full");
      this.isAdmissionFull = true; // Prevent further submissions
      return;
    }

  }

  takeAdmission()
  {
    this.modelobj.name = this.formValue.value.name;
    this.modelobj.email = this.formValue.value.email;
    this.modelobj.mobile = this.formValue.value.mobile;
    this._eventService.postAdmission(this.modelobj).subscribe(res => {
      console.log(res);
      alert("Admission is Successful");
      this.formValue.reset();

      let ref= document.getElementById('close');
      ref?.click();

      this.getAllData();

    }, err=>{
      console.log(err);
      alert("Admission Failed!");
    })
  }

  getAllData()
  {
    this._eventService.getStudents().subscribe(res => {
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
  
  closeModal() {
    this.isAdmissionFull = false;
  }

  
}
