import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  banners: Array<any> = [
    { "title": "Business Services", "value":"business-services", "image": "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-0.3.5&s=a8ef3fd4a48693a0620b614a6209b687&auto=format&fit=crop&w=750&q=80" },
    { "title": "Construction & Engineering", "value":"construction-and-engineering", "image": "https://images.unsplash.com/photo-1498661705887-3778d9ecb4ff?ixlib=rb-0.3.5&s=f51f276113011f5dc3020416e13e5cb6&auto=format&fit=crop&w=550&q=80" },
    { "title": "Environmental", "value":"environmental", "image":  'assets/images/carousel/image1.jpg'},
    { "title": "Transportation", "value":"transportation",  "image": 'assets/images/carousel/image2.jpg' }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getBanners()
   }

  
  public getBanners(){
    this.authService.db.collection('categories').get().then(
      (snapshot)=>{
        snapshot.forEach(
          (doc)=>{
            let data = doc.data()
            data.id = doc.id
            // if(this.banners.length < 3){
              this.banners.push({
                title: data.name,
                value: data.value,
              })
            // }
          }
        )
      }
    ).finally(
      ()=>{
        this.banners[4].image = "https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-0.3.5&s=f695afbce9bdbe2c16c7a7b3875588f2&auto=format&fit=crop&w=500&q=80";
        this.banners[5].image = "https://images.unsplash.com/photo-1463820048975-a3b50e6d991d?ixlib=rb-0.3.5&s=6cfe9709e4c45ab8b4f875c84a2746ed&auto=format&fit=crop&w=500&q=80";

        console.log(this.banners)
      }
    )
  }

  public getBgImage(index){
    let bgImage = {
      'background-image': index != null ? "url(" + this.banners[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
    };
    return bgImage;
  } 

}
