import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  
  subject = new Subject()

  constructor() { } 

  sendItem(item){
    this.subject.next(item)
  }

  getItem(){
    return this.subject.asObservable()
  }

}
