
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  listSource =new BehaviorSubject(["wheat","rice","coco"]);
  currentList = this.listSource.asObservable();


  private sellingSource = new BehaviorSubject( {
    "wheat":
    {"crop": "wheat",
    "price": 5.60,
    "volume": 70,
    "offer": false,
    "sold": false},
    "rice":
    {"crop": "rice",
    "price": 2.30,
    "volume": 35,
    "offer": false,
    "sold": false},
    "coco":
    {"crop": "coco",
    "price": 2.30,
    "volume": 35,
    "offer": false,
    "sold": false},
    "tea":
    {"crop": "tea",
    "price": 2.30,
    "volume": 35,
    "offer": false,
    "sold": false},
    "sugar":
    {"crop": "sugar",
    "price": 2.30,
    "volume": 35,
    "offer": false,
    "sold": false},
    
  });
  currentSelling = this.sellingSource.asObservable();


  constructor() { }


  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeSelling(newSale: Object) {
    /*
    let curr = this.sellingSource.getValue();
    console.log(curr);
    curr.push(newSale);
    let currList = this.listSource.getValue();
    currList.push(newSale["crop"])
    this.listSource.next(currList)
    console.log(this.listSource.getValue())*/
    let curr = this.sellingSource.getValue();
    console.log(curr);
    curr[newSale["crop"]] = newSale;
    this.sellingSource.next(curr)
    console.log(this.sellingSource.getValue())
    let currList = this.listSource.getValue();
    currList.push(newSale["crop"])
    this.listSource.next(currList)
    console.log(this.listSource.getValue())
  }
  }



