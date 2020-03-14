import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {



  constructor(private http: HttpClient) { }

  getBeer() {
     return this.http.get("https://api.openweathermap.org/data/2.5/weather?id=184745&appid=20ddd21d29e527ae53e31ee05ea272f6")
  }
}

