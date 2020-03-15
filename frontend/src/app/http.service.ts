import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  serverData: JSON;
  employeeData: JSON;

  constructor(private http: HttpClient) { }

  getWeather() {
     return this.http.get("https://api.openweathermap.org/data/2.5/weather?id=184745&appid=20ddd21d29e527ae53e31ee05ea272f6")
  }

  getForecast() {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?id=184745&appid=20ddd21d29e527ae53e31ee05ea272f6")
 }

  getPrices(crop) {
    return this.http.get('http://127.0.0.1:5002/prices/'+crop)
  }

  
}

