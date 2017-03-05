import { Component, Input } from '@angular/core';

@Component({
  selector: 'photo',
  templateUrl: 'photo.html'
})
export class PhotoComponent {

  @Input('photo') photo;
  @Input('feedType') feedType;

  constructor() {}

}
