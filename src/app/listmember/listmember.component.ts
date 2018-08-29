import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-listmember',
  templateUrl: './listmember.component.html',
  styleUrls: ['./listmember.component.scss']
})
export class ListmemberComponent implements OnInit {

  constructor( private afDB : AngularFireDatabase) { }

  ngOnInit() {}

  itemPart;
  itemRef: AngularFireList<any>;

  dateInput?: string = '';
  radioModel = 'เวรเช้า'

  initialData() {

      this.itemRef = this.afDB.list(`test/${this.dateInput}/part/${this.radioModel}`);
      this.itemPart = this.itemRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  
  }

  inputDateFn(){
    console.log(this.dateInput);
    this.initialData();
  }

  onRadioModel(value) {
    this.radioModel = value
    this.itemRef = this.afDB.list(`test/${this.dateInput}/part/${this.radioModel}`);
    this.itemPart = this.itemRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }



  getImageUrl(image) {
    if (image == 'เลือก') {
      return '../../assets/unknown.jpg';
    }
    return `../../assets/image/${image}.jpg`;
  }

}
