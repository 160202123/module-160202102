import { Component, OnInit } from '@angular/core';
import { SQLService } from "../../services/sql/sql.service";
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-select',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
})
export class SelectPage implements OnInit {
  berberler = [];
  inputLat: any;
  inputLong: any;
  constructor(private sqlService: SQLService, private geolocation: Geolocation) { }

  mesafeHesapla(lat,long){
    	
    var a = this.inputLat;
    var b = this.inputLong;
    var d = Math.sqrt(Math.pow((lat-a),2)+Math.pow((long-b),2))*100;
    return d;
  
  }
  getLoc(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.inputLat=resp.coords.latitude;
      this.inputLong=resp.coords.longitude;
      console.log(this.inputLat);
      this.getBerberler();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }

  getBerberler() {
    var count=0;
    this.berberler = [];
      /*var berberler = [];
        for (var i = 0; i < data.rows.length; i++) {
          if(data.rows.item(i).lat>44)
          berberler.push({ isim: data.rows.item(i).isim, lat: data.rows.item(i).lat, long: data.rows.item(i).long });
        
      }*/
      this.sqlService.db.executeSql('SELECT * FROM berberler').then((rs: any) => {
        for (var i = 0; i < rs.rows.length; i++){
          var mesafe=this.mesafeHesapla(rs.rows.item(i).lat,rs.rows.item(i).long)
          console.log(mesafe)
          if(mesafe<20){
            this.berberler[count] = rs.rows.item(i).isim;
            count++
          }
        }
        console.log(this.berberler);
        
     });
     
  }
  

  ngOnInit() {
    this.sqlService.getDbState().subscribe(ready => {
      if (ready) {
        //this.getBerberler();
        
      }
    });
  }

}
