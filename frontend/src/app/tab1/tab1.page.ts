import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';
import { ChildActivationStart } from '@angular/router';
import { NumericValueAccessor } from '@ionic/angular';

class Crop{
  
  name: String;
  delta: Number;
  src: String;

  constructor(n,d,s){
    this.name = n;
    this.delta = d;
    this.src = s;

  }
  
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})



export class Tab1Page implements OnInit{


  private myCrops: any = ["wheat", "corn","rice"];
  private allCrops: any = ["wheat", "corn","rice"]
 /* private myCropData: any = {
    wheat: new Crop("wheat", 5, "assets/wheat.jpg"),
    rice: new Crop("rice", 17, "assets/wheat.jpg"),
    corn: new Crop("corn", 2, "assets/wheat.jpg")
  };*/
  private myCropData: any = [
      {
        "name": "wheat",
        "delta": 5
      },
      {
        "name": "rice",
        "delta": 5
      },
      {
        "name": "corn",
        "delta": 5
      },
    ]
  
  
  private canv: HTMLCanvasElement[] = []
  private ct: CanvasRenderingContext2D[] = [];// = this.canv[0].getContext('2d');'

  
  constructor(private _http: HttpService) {}
  

  ngOnInit(): void {

    setTimeout(() => this.testThis(), 3000)

    setTimeout(() => this.getPrice(), 5000)
 
  }

  testThis(){
    
    for(let i=0;i<this.myCrops.length;i++){
      //

      var crop = this.myCrops[i]

      this.canv.push(document.getElementById(crop+"-metric-bar") as HTMLCanvasElement);
      this.ct.push(this.canv[i].getContext('2d'));

      var grd = this.ct[i].createLinearGradient(0, 0, 200, 0);
      grd.addColorStop(0, "red");
      grd.addColorStop(1, "green")  
      this.ct[i].fillStyle = grd;
      this.ct[i].fillRect(0, 0, 340, 40);

      this.ct[i].fillStyle = "black";
      this.ct[i].fillRect(150, 0, 20, 40);
  
    }
  
  }

  
}



