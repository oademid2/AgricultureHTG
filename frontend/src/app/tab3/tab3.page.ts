import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from "../data.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sellingList: any;
  sellingListNames: any;
  currentOffer: any = {
    seller: "Moses Samson",
    crop: "wheat",
    rating: 4.5,
    location: 'Kuari',
    details: 'Pick up tomorrow @ 10am-12pm'
  };

  offers: any = {

    "wheat":{
      seller: "Moses Samson",
      crop: "wheat",
      rating: 4.5,
      location: 'Kuari',
      details: 'Pick up tomorrow @ 10am-12pm'
    }
    
  }

  constructor(private _http: HttpService, private _data: DataService) {}
  

  ngOnInit(): void {
    console.log("test")
    this._data.currentSelling.subscribe(res => {
      
      this.sellingList = res;
      console.log('xxx',res)
      console.log('xxx',res["wheat"].offer)

    })
    this._data.currentList.subscribe(res => {
      
      this.sellingListNames = res;

    })
  
  }

  openmodal (crop) {
    this.currentOffer = this.offers[crop];
    let modal = document.getElementById("myModal") as HTMLElement;
    modal.style.display = "block";
    console.log('open')
  }
  
  // When the user clicks on <span> (x), close the modal
  closemodal() {
    let modal = document.getElementById("myModal") as HTMLElement;
    modal.style.display = "none";
  }

  acceptOffer(crop){
    this.sellingList[crop].sold = true;
    this.closemodal()
  }

  simulate(){
    this.sellingList["wheat"].offer = true;

  }



}
