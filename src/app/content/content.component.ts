import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Time } from '@angular/common';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']

})
export class ContentComponent {


  @ViewChild('loginModal') loginModal: { show: Function, hide: Function };
  @ViewChild('addMember') addMember: { show: Function, hide: Function };


  public onlineStatus;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  scenes: Array<string> = ["1. ปวดท้อง/หลัง", "2. แพ้ ", "3. สัตว์กัด", "4. เลือดออก", "5. หายใจลำบาก/ติดขัด", "6. หัวใจหยุดเต้น", "7. เจ็บแน่นทรวงอก/หัวใจ", "8. สำลัก/อุดกั้นทางเดินหายใจ", "9. เบาหวาน", "10. ภาวะฉุกเฉินเหตุสิ่งแวดล้อม", "11. [เว้นว่าง]", "12. ปวดศีรษะ/ทางตา/หู/คอ/จมูก", "13. ภาวะทางจิตประสาท/อารมณ์", "14. พิษ/รับยาเกินขนาด", "15. มีครรภ์/คลอด/นรีเวช", "16. ชัก/มีสัญญานบอกเหตุการชัก", "17. ป่วย/อ่อนเพลีย", "18. อัมพาต กล้ามเนื้ออ่อนแรง/เฉียบพลัน", "19. ไม่รู้สติ/ไม่ตอบสนอง/หมดสติชั่ววูบ", "20. เด็ก (กุมารเวชกรรม)", "21. ถูกทำร้าย", "22. ไหม้/Burnไฟฟ้าช๊อต", "23. ตกน้ำ/บาดเจ็บทางน้ำ", "24. พลัดตกหกล้ม/อุบัติเหตุ/เจ็บปวด", "25. อุบัติเหตุยานยนต์"];
  users: Array<any>;
  myDate: Date;
  team: string = "";
  selectedValue: string = "";
  selectedUser: string = "";
  length: number
  usericonLogin = "../../assets/unknown.jpg";
  userAvatar = "../../assets/unknown.jpg";
  userName: string = "Login";
  userNameLogin: string = '';
  note: string = '';
  loginStatus: boolean = true;
  loginLabel = "Log in";
  dateSelected: string = '';
  datepick: any;
  dateInput?: string = '';

  leaders: string[] = ['เพิ่มศิริ เลอมานุวรรัตน์','ประภา ปัญญาเพียร','กนกพร จตุพรรัตนพันธ์', 'จิณห์นิภาท์ ฤทธิเดช', 'ณปภัทช์ เติมใจ','ณิชชาอร เลขาวิวัชกุล','ธมลวัลย์ จันทร์เกตุ','ธวัชชัย สุพล','ธวัลรัตน์ พันธีรโรจน์','ธีรยุทธ บัวพันธ์','นริสรา พงษ์สุวรรณ','อำนาจ ธงชัย','มาฆมาศ สิมมาทอง','ประวิทย์ โพธิสาร'];
  members: string[] = ['สุนทร บุญส่ง','รังสรรค์ คำคาวี','ดวงอนุชา บุตรชาติ','จันสุดา เหล็กเพชร','ปริมปภาภรณ์ บุตรศรี','สมรักษ์​ โสพัฒน์', 'ถิรายุ โกฎหอม', 'ธนาภรณ์ ปัดถา','ธรรมนูญ เกษมสัตย์'];
  drivers: string[] = ['วีระวัฒน์ สมภาวะ', 'ศราวุฒิ ปัญญาไวย์', 'อาคม นิยม','กิติศักดิ์ บังลังค์','วรานุวัฒน์ โสพัฒน์','ไสว ทองพันช่าง','เทพพร ก้อนคำ','สัมฤทธิ์ ศรีกุล','สมเกียรติ ไชยสุนทร'];
  default: string = 'เลือก';
  Form: FormGroup = this.builder.group({
    director: [this.default, Validators.required],
    calltacker1: [this.default, Validators.required],
    calltacker2: [this.default, Validators.required],
    leader1: [this.default, Validators.required],
    leader2: [this.default, Validators.required],
    member1: [this.default, Validators.required],
    member2: [this.default, Validators.required],
    driver: [this.default, Validators.required],
    part: ''
  })

  selected;
  radioChange(e) {
    console.log(e)
    console.log(this.selected)
  }

  constructor(private afDB: AngularFireDatabase, private builder: FormBuilder) {
    this.dateInput = '26-8-201833';

  }

  initialData() {
    this.itemsRef = this.afDB.list(`test/${this.dateInput}/numbers`);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.itemsRef.snapshotChanges().map(list => list.length).subscribe(
      length => this.length = length
    )
  }



  // date;
  // valueChange() {
  // var a = document.getElementById("datepicker").textContent ;
  //   console.log('date:' + this.datepick)
  //   this.date = '2-2-2'
  //   this.date = this.datepick;
  //   let email = "0.0.0"
  //   let re = /\-/gi;
  //   let result = this.date.replace(re, "x");
  //   console.log(result)
  // }

  inputDateFn() {
    if (this.dateInput != '') {
      alert("วันที่ : " + this.dateInput + "  งานการแพทย์ฉุกเฉิน ยินดีต้อนรับ  ")
      this.initialData();
    } else {
      alert("กรุณาลงวันที่ หรือดูรูปแบบวันที่ตามตัวอย่างที่แสดงหน้าจอ")
    }

  }


  ngOnInit() {

    setTimeout(() => {
      this.loginModal.show();
    }, 1000);


    setInterval(() => {         //replaced function() by ()=>
      this.myDate = new Date();
      this.checkInternet();
    }, 1000);


    this.users = [
      { no: '0', name: '', icon: '../../assets/unknown.jpg' },
      { no: '1', name: 'JUM', icon: 'https://scontent.fbkk1-6.fna.fbcdn.net/v/t1.0-9/33848350_812327728965081_654839941200609280_n.jpg?_nc_fx=fbkk1-4&_nc_cat=0&_nc_eui2=AeEE5e8SSV3qTYwn63i7kvVSlWA0JCY6Hj8nx11SbdoaFv4tq-eTixVDblVScZ8BVnTU_5GWfkuDlePnORgS3Qa8J_O5u3kl0lMUVN7wy6XFSg&oh=e409ec62c1d23a107fcc973ff302ea08&oe=5BF1E054' },
      { no: '3', name: 'Max', icon: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/22894382_1349754738466301_3426447927998133456_n.jpg?_nc_cat=0&oh=4a535340f8ac28cfc92f4c9684ca1d38&oe=5B9C1229' },
      { no: '3', name: 'Nai', icon: 'https://scontent.fbkk1-3.fna.fbcdn.net/v/t1.0-9/34919581_1744173612338001_4489725079118151680_n.jpg?_nc_fx=fbkk1-4&_nc_cat=0&_nc_eui2=AeFhKSjAni9HoVJolnQ2GtVoAHD-km54kOAopaXWHMiHuSjoqSSb3Yr16Vnc1VguJW5C5vNJGYESiuqcqpf0Blj5UzQJWvnS1omNx4N-YFDu4A&oh=2ae4b5824ad738791b679cd71cc1ceac&oe=5C00A06C' },
      { no: '3', name: 'Soon', icon: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/11270115_1618951101654802_3491114798328605761_n.jpg?_nc_cat=0&oh=c57f4c7de89799ea1e5a710c846bacbb&oe=5B8E20E6' },
      { no: '2', name: 'Duang', icon: 'https://scontent.fbkk1-3.fna.fbcdn.net/v/t1.0-9/36063313_1830116853711210_4345538478621065216_n.jpg?_nc_fx=fbkk1-4&_nc_cat=0&_nc_eui2=AeEVhrEk0fZ9UekD8i6c0e8E1pLgKEiriXozfbeBqM2D6tbGZiM9zb7VjKXL53T5I1WmCFjiU7tYGBrtONUk7g48Cq1zCmEuhNwe2MZTQ97SsQ&oh=e2083202470f77d59e1692948d7f9d87&oe=5BEFF7D3' },
      { no: '3', name: 'Aom', icon: 'https://scontent.fbkk1-2.fna.fbcdn.net/v/t1.0-9/27545476_1684039448320007_1191864929085750470_n.jpg?_nc_fx=fbkk1-4&_nc_cat=0&_nc_eui2=AeGwpUUQ_dmroQcfi6W3RniqVw4THwv2mvHIdEce0xYW20GyRWs6evQAxrCfVPzW0CUq94S6LDjnyplJSHgS6bEm-C6qdSrtltTxNnlB5QrMIw&oh=bb0cb6490922d16f8d18483e53f9cd09&oe=5BF5DD28' },
      { no: '3', name: 'Prim', icon: 'https://scontent.fbkk1-5.fna.fbcdn.net/v/t1.0-9/38490902_1904241106265030_1559968324186537984_o.jpg?_nc_fx=fbkk1-4&_nc_cat=0&_nc_eui2=AeEF19-hgq9BLzPg4EKemHC2vaH-j0lMAIYdJIpktzpEW_YHpdAdUaziEjfNGGdTkgmgPAVdMZJBVsePs6YDcGXY0e4Cr7oXJR5i4zg0RSBCOQ&oh=a57e9bf031f58cb07757b1823b8b3edb&oe=5C13663F' },
      { no: '3', name: 'Add', icon: '../../assets/unknown.jpg' },
      { no: '3', name: 'Somruk', icon: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t31.0-8/30051868_1790826244343407_1613055652281267038_o.jpg?_nc_cat=0&oh=6021f244e38df241bf8547edad290b58&oe=5B9790A9' },
      { no: '3', name: 'Jeed', icon: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/28056382_2026206780988318_5770099347742291995_n.jpg?_nc_cat=0&oh=bbaac77f5c42ec0f3bd1436eb3f748b0&oe=5B959F12' },
      { no: '3', name: 'Yok', icon: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t31.0-8/27798165_10209400968095890_139395733847077776_o.jpg?_nc_cat=0&oh=005461113926f51ffb5b361e4f75d39b&oe=5B8FB227' },
      { no: '3', name: 'Too', icon: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/21687588_588335748003747_6898293514855277801_n.jpg?_nc_cat=0&oh=85078cd602466336c1c013b83bd11b7d&oe=5B930B36' },
      { no: '3', name: 'Kik', icon: 'https://scontent.fbkk1-4.fna.fbcdn.net/v/t1.0-1/14370141_10208868811812372_2534066410561035049_n.jpg?_nc_cat=0&_nc_eui2=AeEsTd2N3PAMv3r_smGOmr0qTfWG36lXWqiOa5glydWPnUL9JSlDUdJqyb69YBHWIvSogeQi8U47N_8GNSCSRpy5ua-4RM2lAzzs8CQGnzELBQ&oh=05e2b96b1f9eade105fe794217af4295&oe=5BF98ED9' },
      { no: '3', name: 'Aon', icon: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/29356259_1692101067525164_2179308978976834767_n.jpg?_nc_cat=0&oh=301d17b0f267b5390dc9ee4e89b6d08c&oe=5B8BE247' },
      { no: '3', name: 'Wat', icon: 'https://scontent.fbkk1-4.fna.fbcdn.net/v/t1.0-9/24131015_1708527462493256_2079461869982859036_n.jpg?_nc_fx=fbkk1-4&_nc_cat=0&_nc_eui2=AeEtBUzbq-krYBGZKGGh6RR1qgQ5KLki2Q-FWqlmWHHfsg90AESgvg8T_TjVIMGQtjqVZ1kQ9s3izyejElvORkznO5Ry6Dm-etqmcer9qAlGzQ&oh=97b8d167eecd0cbccc8aed4e5fccb570&oe=5BF8CB95' },
      { no: '3', name: 'P`A', icon: '../../assets/unknown.jpg' },
      { no: '3', name: 'Naris', icon: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/30657177_1814906798569731_3933548558328343622_n.jpg?_nc_cat=0&oh=c553b58e17251f3665e3f51697b7964e&oe=5B8D1694' },
      { no: '3', name: 'KK', icon: 'https://scontent.fbkk1-2.fna.fbcdn.net/v/t1.0-9/22815518_2027323587498382_5710854563461131902_n.jpg?_nc_fx=fbkk1-4&_nc_cat=0&_nc_eui2=AeEaCRldeM27l7xBjnPzbQlRqzzbUmFXVl3FD-_lBUvg7krG4voCw9vcQF7NQHLUQpFD7wwrJxK35vnZZwgoWkCA7kdCNK_c20Gzu5QpFnlX3w&oh=7b833320e0e2f3c103650442d6690ba1&oe=5BF46B3B' },
      { no: '3', name: 'Maew', icon: 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/30743627_2203323583041683_8555409308412542976_n.jpg?_nc_cat=0&oh=e976c4dd03d0e21b0f703ee8f2cfc766&oe=5B9B9655' },
      { no: '3', name: 'Prapa', icon: 'https://scontent.fbkk1-5.fna.fbcdn.net/v/t1.0-9/17553556_101270410419415_329652909575915499_n.jpg?_nc_fx=fbkk1-4&_nc_cat=0&_nc_eui2=AeGEe2vMCFdonYpY3FPduCHADyU1KQ7K4k3G4Apwg-rwmH_X34e8jn89xvL2LPPvvXkAQEkCvL33Rs_tHkkxB7XXr_Nzt8CsfelV70L82PpbEA&oh=96cc421576b81714a8aa350c774f8fe6&oe=5C0BB040' },

    ];
  }
  navigator_check: boolean = false;

  btnColor = "";
  checkInternet() {
    if (navigator.onLine) {
      this.onlineStatus = "Online"
      this.navigator_check = true;
      this.btnColor = "btn-success";
    } else {
      this.onlineStatus = "Offline"
      this.btnColor = "btn-danger";
      this.navigator_check = false;
    }

  }
  onChange(user) {
    this.userAvatar = user.icon;
    this.userName = user.name;
  }

  onLogin() {

    this.usericonLogin = this.userAvatar;
    this.userNameLogin = this.userName;

    if (this.loginStatus) {
      this.onLogout();
      this.loginLabel = "Log out"
    } else {
      this.loginLabel = "Log in"
    }
  }

  onLogout() {
    this.userAvatar = "../../assets/unknown.jpg";
    this.userName = '';
  }

  addQueue() {

    if (this.dateInput != '') {

      console.log(this.team);
      console.log(this.selectedValue);

      const itemsRef = this.afDB.list(`test/${this.dateInput}/numbers`);
      itemsRef.push({ team: this.team, scene: this.selectedValue, user: this.userNameLogin, timestamp: Date.now(), note: this.note, number: this.length + 1 });

      // clear text
      this.team = "";
      this.selectedValue = "";
    } else {
      alert('กรุณาป้อนวันที่ หรือดูรูปแบบวันที่ตามตัวอย่างที่แสดงหน้าจอ')
    }
  }

  itemPart;
  itemRef: AngularFireList<any>;

  onAddMemberModal() {

    if (this.dateInput != '') {
      this.addMember.show();

      this.itemRef = this.afDB.list(`test/${this.dateInput}/part/${this.radioModel}`);
      this.itemPart = this.itemRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
    } else {
      alert('กรุณาป้อนวันที่ หรือดูรูปแบบวันที่ตามตัวอย่างที่แสดงหน้าจอ')
    }
  }

  onSubmit() {
    console.log(this.Form.value)

    if (this.dateInput != '') {
      // delete
      const itemsRefDel = this.afDB.list(`test/${this.dateInput}/part/${this.radioModel}`);
      itemsRefDel.remove();


      const itemsRef = this.afDB.list(`test/${this.dateInput}/part/${this.radioModel}`);
      itemsRef.push(this.Form.value)
    } else {
      alert('กรุณาป้อนวันที่ หรือดูรูปแบบวันที่ตามตัวอย่างที่แสดงหน้าจอ')
    }

  }

  radioModel: string = 'เวรเช้า';
  onRadioModel(value) {
    this.radioModel = value
    this.itemRef = this.afDB.list(`test/${this.dateInput}/part/${this.radioModel}`);
    this.itemPart = this.itemRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }


  

}


