import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  public endpoint = "http://localhost:5000";

  get(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
      .subscribe(response => {
        callback(response.json());
      });
  }

  getList(callback) {
    // const list = [
    //   new Coffee("Double Espresso", "Sunny Cafe", new PlaceLocation("123 Market St", "San Francisco")),
    //   new Coffee("Caramel Americano", "Starcoffee", new PlaceLocation("Gran Via 34", "Madrid"))
    // ];
    // callback(list);

    this.http.get(`${this.endpoint}/coffees`)
      .subscribe(response => {
        console.log(response.json())
        callback(response.json());
      })
  }

  save(coffee, callback) {
    if (coffee._id) { // UPDATE
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
        .subscribe(response => {
          callback(true)
        });
    } else { // INSERT
      this.http.post(`${this.endpoint}/coffees`, coffee)
        .subscribe(response => {
          callback(true)
        });
    }
    callback(true);
  }

}
