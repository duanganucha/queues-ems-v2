import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})

export class RightComponent  {

  @ViewChild('formModal') formModal: { show: Function, hide: Function };

  
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  
  item : Items = new Items(); 
  dateInput? : string;
  
  constructor(private afDB: AngularFireDatabase) {
    this.initialData()
  }

  initialData(){
    this.itemsRef = this.afDB.list(`test/${this.dateInput}/numbers`);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  inputDateFn(){
    console.log(this.dateInput);
    this.initialData();
  }




  onManager(item){
    console.log(item.key)
    this.item.timestamp = item.timestamp;
    this.item.number = item.number;
    this.item.team = item.team;
    this.item.scene = item.scene;
    this.item.user = item.user;
    this.item.note = item.note;
    this.item.key = item.key;
  }

  onUpdate(){
    console.log(this.item.key)
    this.itemsRef = this.afDB.list(`test/${this.dateInput}/numbers`);
    this.itemsRef.update(this.item.key , { 
      team : this.item.team ,
      scene : this.item.scene,
      note : this.item.note
    })
  }

  onDelete(){
    const itemsRef = this.afDB.list(`test/${this.dateInput}/numbers`);
    itemsRef.remove(this.item.key);
    // this.onReset()
  }

}

class Items  {
  key : string;
  number : number;
  timestamp2 = Date.now();
  timestamp ;
  team?:string;
  scene?:string;
  user?:string;
  note?:string;

}
