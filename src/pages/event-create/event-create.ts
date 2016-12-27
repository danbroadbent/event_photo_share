import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventData } from '../../providers/event-data';

@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {

  event: FormGroup;

  constructor(public navCtrl: NavController, public platform: Platform, public formBuilder: FormBuilder, public eventData: EventData) {
    this.event = formBuilder.group({
      eventName: ['']
    });
  }

  createEvent(): void {
    let data = this.event.value;
    this.eventData.createEvent(data);
    this.navCtrl.pop();  
  }

  ionViewDidLoad() {

  }

}
