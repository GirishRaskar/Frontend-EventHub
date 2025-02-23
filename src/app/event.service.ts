import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';

@Injectable()
export class EventService {

  private _eventsUrl = "https://backend-eventhub.onrender.com/api/events";
  private _specialEventsUrl = "https://backend-eventhub.onrender.com/api/special";

  constructor(private http: HttpClient) { }

  getEvents() : any {
    return this.http.get<any>(this._eventsUrl)
  }

  getSpecialEvents() : any {
    return this.http.get<any>(this._specialEventsUrl)
  }

  postAdmission(data:any ) 
  {
    return this.http.post<any>("https://backend-eventhub.onrender.com/api/postData", data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getStudents() 
  {
    return this.http.get<any>("https://backend-eventhub.onrender.com/api/getData").pipe(map((res:any)=>{
      return res;
    }));
  }

  postAdmissionS(data:any ) 
  {
    return this.http.post<any>("https://backend-eventhub.onrender.com/api/postDataS", data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getStudentsS() 
  {
    return this.http.get<any>("https://backend-eventhub.onrender.com/api/getDataS").pipe(map((res:any)=>{
      return res;
    }));
  }
}
