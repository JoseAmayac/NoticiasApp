import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia:Article;
  @Input() i:number;
  @Input() enfavoritos:boolean;

  
  constructor(private iab:InAppBrowser,
              private actionSheetCtrl:ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocal:DataLocalService,
              private platform:Platform
              ) 
  {

  }

  ngOnInit() {}

  

  abrirNoticia(){
    this.iab.create(this.noticia.url,'_system')
  } 

  async lanzarMenu(){
    
    let guardarBorrarBtn;

    if( this.enfavoritos ){
      guardarBorrarBtn = {
        text: 'Borrar de Favorito',
        icon: 'trash',
        cssClass:'action-dark',
        handler: () => {
          this.dataLocal.borrarNoticia( this.noticia )
        }
      }

    }else{
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass:'action-dark',
        handler: () => {
          this.dataLocal.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass:'action-dark',
        handler: () => {
          this.compartirNoticia()

          
        }
      },
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass:'action-dark',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia(){

    if(this.platform.is('cordova')){
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      )
    }else{
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        console.log('Opción de compartir no soportada');
      }
    }

  }
}
