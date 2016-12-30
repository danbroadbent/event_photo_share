import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventData } from '../../providers/event-data';

@Component({
  selector: 'page-event-edit',
  templateUrl: 'event-edit.html'
})
export class EventEditPage {

  event: any;
  eventEdit: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public eventData: EventData) {
    this.event = this.navParams.get('event');
    this.eventEdit = formBuilder.group({
      eventName: [this.event.name],
      eventDescription: [this.event.description]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventEditPage');
  }

  editEvent(): void {
    let data = this.eventEdit.value;
    this.eventData.editEvent(data, this.event.id)
    this.navCtrl.pop();  
  }

}
