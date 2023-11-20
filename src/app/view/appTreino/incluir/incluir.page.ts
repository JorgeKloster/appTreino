import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/commom/alert';
import { Treino } from 'src/app/model/entities/Treino';
import { AuthService } from 'src/app/model/services/auth.service';
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
  user : any;

  constructor(private router : Router,
    private auth : AuthService,
    private firebase : FirebaseService,
    private alert : Alert) { 
      this.user = this.auth.getUsuarioLogado();
    }

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
      novo.uid = this.user.uid;
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
          this.alert.presentAlert("Erro", "Erro ao salvar treino!");
        })
        this.router.navigate(["/home"]);
      }
    }else{
      this.alert.presentAlert("erro", "Grupo Muscular e Dia da Semana são campos obrigatórios");
    }
  }

}
