import { Component } from '@angular/core';
import { HttpService } from '../http.service';

class Weather{
  temp: number;
  weather: number;
  percipitation: number;
  Soil: string;

  constructor(w,t,p,s){

    this.temp = Number((Math.round((t-273) * 100) / 100).toFixed(2));
    this.weather = w;
    this.percipitation = p;
    this.Soil = s;
  }
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  test: any ={
    "coord": {
        "lon": 36.82,
        "lat": -1.28
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 289.7,
        "feels_like": 290.77,
        "temp_min": 286.48,
        "temp_max": 291.15,
        "pressure": 1022,
        "humidity": 93
    },
    "visibility": 10000,
    "wind": {
        "speed": 1
    },
    "clouds": {
        "all": 75
    },
    "dt": 1584159793,
    "sys": {
        "type": 1,
        "id": 2543,
        "country": "KE",
        "sunrise": 1584157103,
        "sunset": 1584200727
    },
    "timezone": 10800,
    "id": 184745,
    "name": "Nairobi",
    "cod": 200
}

currentWeather:any;
  

constructor(private _http: HttpService) {}

ngOnInit(): void {

 this.currentWeather = new Weather(this.test.weather[0].main, this.test.main.temp, this.test.main.pressure, this.test.main.humidity);
 console.log(this.currentWeather)

}


}
