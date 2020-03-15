import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from "../data.service";

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

  NewSale ={
    "crop": null,
    "price": null,
    "volume": null,
    "offer": false,
    "sold": false
  }

  private myCrops: any = ["wheat", "corn","rice"];
  private allCrops: any = ["wheat", "corn","rice"]

  cropDB: any = 
      {"wheat":{
        "name": "wheat",
        "delta": 20
        }
      ,
       "rice":{
        "name": "rice",
        "delta": 5
      }
      ,
      "corn":{
        "name": "corn",
        "delta": 5
      }
    }

  




  
  private canv: HTMLCanvasElement[] = []
  private ct: CanvasRenderingContext2D[] = [];// = this.canv[0].getContext('2d');'

  
  constructor(private _http: HttpService, private _data: DataService) {}
  

  ngOnInit(): void {

    setTimeout(() => this.showMetricBar(), 500)
    this.initMetrics(); 

    
    
  }

  initMetrics(){
    for(let i in this.myCrops){
    let crop = this.myCrops[i]
    this._http.getPrices(crop).subscribe(data => {
      this.cropDB[crop] = data;
      console.log(data);
    })

  }


  }

  showMetricBar(){
    
    for(let i=0;i<this.myCrops.length;i++){

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

openSellModal (crop) {
  let modal = document.getElementById("SellModal") as HTMLElement;
  modal.style.display = "block";
  this.NewSale["crop"]  = crop;
  console.log(crop)
}

// When the user clicks on <span> (x), close the modal
closeSellModal() {
  let modal = document.getElementById("SellModal") as HTMLElement;
  modal.style.display = "none";
}

addSale() {
  console.log(this.NewSale);
  this.closeSellModal()

  this._data.changeSelling(this.NewSale);


}










  
  
}






/*

  private myCropData: any = [
    {
      "name": "wheat",
      "delta": 20
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

*/



