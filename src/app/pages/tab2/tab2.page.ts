import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public categorias:string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  public noticias:Article[] = [];
  public categoria = this.categorias[0];

  constructor(private service:NoticiasService) {}
  ngOnInit(){
    this.cargarNoticias(this.categorias[0])
  }

  cambioCategoria(event){
    this.noticias = [];
    this.cargarNoticias(event.detail.value)
    this.categoria = event.detail.value;
  }

  loadData( event ){
    this.cargarNoticias( this.categoria, event);
  }

  cargarNoticias(categoria:string, event?){
    this.service.getTopHeadlinesCategoria(categoria).subscribe(
      data=>{
        this.noticias.push(...data.articles)

        if(event){
          event.target.complete()
        }
      }
    )
  }
}
