import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  

  public noticias:Article[] = [];

  constructor(private storage:Storage,private toast:ToastController) { 
    this.cargarFavoritos()
  }

  async mostrarMensaje(message:string) {
    const toast = await this.toast.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  guardarNoticia(noticia:Article){
    const existe = this.noticias.find(noti => noti.title === noticia.title)
    if(!existe){
      this.noticias.unshift(noticia)
      this.storage.set('favoritos',this.noticias);
      this.mostrarMensaje('Noticia agregada a favoritos')

    }

  }

  async cargarFavoritos(){
    const favoritos =  await this.storage.get('favoritos')
    if(favoritos){
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set('favoritos',this.noticias);
    this.mostrarMensaje('Noticia eliminada de favoritos')

  }
}
