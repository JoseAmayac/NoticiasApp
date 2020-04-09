import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public articles:Article[] = [];

  constructor(private service:NoticiasService) {}

  ngOnInit(){
    this.cargarNoticias()
  }

  loadData( event ){
    this.cargarNoticias( event )
  }

  cargarNoticias( event? ){
    this.service.getTopHeadlines().subscribe(
      noticias=>{
        if(noticias.articles.length == 0){
          event.target.disabled = true;
          event.target.complete()
        }
        this.articles.push( ...noticias.articles );
        if( event ){
          event.target.complete();
        }
      }
    )
    
  }
}
