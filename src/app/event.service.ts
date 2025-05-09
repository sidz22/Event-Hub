import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EventService {

  private _eventsUrl = "/api/events";
  private _specialEventsUrl = "/api/special";

  constructor(private http: HttpClient) { }

  getEvents() : any {
    return this.http.get<any>(this._eventsUrl)
  }

  getSpecialEvents() : any {
    return this.http.get<any>(this._specialEventsUrl)
  }
}
