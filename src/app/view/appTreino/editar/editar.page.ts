import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'src/app/commom/alert';
import { Treino } from 'src/app/model/entities/Treino';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  grupoMusc! : string;
  diaSemana! : string;
  horario! : string;
  duracao! : string;
  treino! : Treino;
  imagem! : any;
  user : any;

  constructor(
    private alert : Alert,
    private router : Router,
    private firebase : FirebaseService,
    private alertController : AlertController,
    private auth : AuthService) {
      this.user = this.auth.getUsuarioLogado();
     }

  ngOnInit() {
    this.treino = history.state.treino;
    this.grupoMusc = this.treino.grupoMusc;
    this.diaSemana = this.treino.diaSemana;
    this.horario = this.treino.horario;
    this.duracao = this.treino.duracao;
    }

  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }
 
  editar(){
    if(this.grupoMusc && this.diaSemana){
      let novo : Treino = new Treino(this.grupoMusc, this.diaSemana);
      novo.horario = this.horario;
      novo.duracao = this.duracao;
      novo.id = this.treino.id;
      novo.uid = this.user.uid;
      if(this.imagem){
        this.firebase.inserirFoto(this.imagem, novo)
        ?.then(()=> {
          this.router.navigate(["/home"]);
        })
      }else{
        novo.downloadURL = this.treino.downloadURL;
        this.firebase.atualizar(novo, this.treino.id)
        .then(()=> this.router.navigate(["/home"]))
        .catch((error) => {
          console.log(error);
          this.alert.presentAlert("Erro", "Erro ao salvar treino!");
        })
        this.router.navigate(["/home"]);
      }
    }else{
      this.alert.presentAlert("erro", "Grupo Muscular e Dia da Semana são campos obrigatórios");
    }
  }

  excluir(){
    this.presentConfirmAlert("Atenção!", "Deseja excuir esse treino da lista?");
  }

  excluirTreino(){
    this.firebase.deletar(this.treino.id)
    .then(() => {this.router.navigate(["/home"]);});
    this.router.navigate(["/home"]);
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Treinos',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text:'Cancelar', role: 'cancelar', handler: ()=>{console.log("Cancelou")}},
        {text:'Confirmar', role: 'confirmar', handler: (acao)=>{this.excluirTreino()}}
      ],
    });
    await alert.present();
  }
}
