import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Treino } from 'src/app/model/entities/Treino';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.page.html',
  styleUrls: ['./incluir.page.scss'],
})
export class IncluirPage implements OnInit {

  public grupoMusc! : string;
  public diaSemana! : string;
  public horario! : string;
  public duracao! : string;
  public imagem! : any;

  constructor(private router : Router,
    private firebase : FirebaseService,
    private alertController : AlertController) { }

  ngOnInit() {
  }

  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }

  incluir() {
    if(this.grupoMusc && this.diaSemana){
      let novo : Treino = new Treino(this.grupoMusc, this.diaSemana);
      novo.horario = this.horario;
      novo.duracao = this.duracao;
      if(this.imagem){
        this.firebase.inserirFoto(this.imagem, novo)
        ?.then(()=> {
          this.router.navigate(["/home"]);
        })
      }else{
        this.firebase.incluir(novo)
        .then(()=> this.router.navigate(["/home"]))
        .catch((error) => {
          console.log(error);
          this.presentAlert("Erro", "Erro ao salvar treino!");
        })
        this.router.navigate(["/home"]);
      }
    }else{
      this.presentAlert("erro", "Grupo Muscular e Dia da Semana são campos obrigatórios");
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
  
    await alert.present();
  }

}
