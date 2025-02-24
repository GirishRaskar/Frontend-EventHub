import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { model } from './model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  standalone: false
})
export class EventsComponent implements OnInit {
  
  formValue!: FormGroup;
  events: any[] = [];
  allStudentData: any;
  modelobj: model = new model();
  isAdmissionFull: boolean = false;

  constructor(private _eventService: EventService, private formbuilder: FormBuilder) {}

  ngOnInit() {
    this._eventService.getEvents()
      .subscribe(
        res => this.events = res,
        err => console.log(err)
      );

    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: ['']
    });

    this.getAllData();
  }

  onClickAdmission(cbatch: string) {
    this.getAllData();
    this.formValue.reset();
    this.modelobj.batch = cbatch;

    if (this.allStudentData && this.allStudentData.length >= 10) {
      alert("Admission Full");
      this.isAdmissionFull = true;
      return;
    }
  }

  takeAdmission() {
    this.modelobj.name = this.formValue.value.name;
    this.modelobj.email = this.formValue.value.email;
    this.modelobj.mobile = this.formValue.value.mobile;

    this._eventService.postAdmission(this.modelobj).subscribe(res => {
      console.log(res);
      alert("Admission is Successful");
      this.formValue.reset();
      this.getAllData();
    }, err => {
      console.log(err);
      alert("Admission Failed!");
    });
  }

  getAllData() {
    this._eventService.getStudents().subscribe(res => {
      this.allStudentData = res;
    }, err => {
      console.log(err);
    });
  }

  closeModal() {
    this.isAdmissionFull = false;
  }
}
