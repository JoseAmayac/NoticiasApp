import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

const apiKey = environment.api_key;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key':apiKey
})
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  public api_uri = "top-headlines?country=us&apiKey=34733280818e478db9875fad9343e9c9"
  public headlinePage = 0;
  public categoriaActual = "";
  public categoriaPage = 0;

  constructor(private http:HttpClient) { }

  private ejecutarQuey<T>(query:string){
    query = apiUrl + query;
    return this.http.get<T>(query,{ headers });
  }
  getTopHeadlines(){
    this.headlinePage++;
    return this.ejecutarQuey<RespuestaTopHeadlines>('/top-headlines?country=co&page='+this.headlinePage);
  }

  getTopHeadlinesCategoria(categoria:string){
    if(categoria == this.categoriaActual){
      this.categoriaPage++;
      return this.ejecutarQuey<RespuestaTopHeadlines>('/top-headlines?country=co&category='+categoria+"&page="+this.categoriaPage)
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
      return this.ejecutarQuey<RespuestaTopHeadlines>('/top-headlines?country=co&category='+categoria+"&page="+this.categoriaPage)
    }
  }
}
