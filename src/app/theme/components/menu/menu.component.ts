import { AuthService } from './../../../services/auth.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories :any[]=[];
  constructor(private authService: AuthService) { }

  ngOnInit() { 
    this.authService.db.collection('categories').get().then(
      (snapshot)=>{
        snapshot.forEach(
          (doc)=>{
            let data = doc.data()
            data.id = doc.id
            this.categories.push(data)
          }
        )
      }
    ).finally(
      ()=>{
        console.log(this.categories)
      }
    )
  }

  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }        
    });
  }

}
