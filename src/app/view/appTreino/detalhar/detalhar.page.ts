import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercicio } from 'src/app/model/entities/Exercicio';
import { Treino } from 'src/app/model/entities/Treino';
import { FirebaseService } from 'src/app/model/services/firebase.service';


@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  grupoMusc! : string;
  diaSemana! : string;
  horario! : string;
  duracao! : string;
  treino! : Treino;
  exercicios! : Exercicio;
  exercicio! : string;
  series! : number;
  repeticoes! : number;
  downloadURL! : any;

  public listaDeExercicios : Exercicio[] = []

  constructor(
    private router : Router,
    private firebase : FirebaseService
  ) { 
    this.firebase.mostrarTodosExercicios()
    .subscribe(res => {
      this.listaDeExercicios = res.map(exercicio => {
        return{
          id: exercicio.payload.doc.id,
          ...exercicio.payload.doc.data() as any
        }as Exercicio
      }
      )
    })
  }

  ngOnInit() {
    this.treino = history.state.treino;
    this.grupoMusc = this.treino.grupoMusc;
    this.diaSemana = this.treino.diaSemana;
    this.horario = this.treino.horario;
    this.duracao = this.treino.duracao;
    this.exercicio = this.exercicios.exercicio;
    this.exercicios = history.state.exercicios;
    this.series = this.exercicios.series;
    this.repeticoes = this.exercicios.repeticoes;
    this.downloadURL = this.treino.downloadURL;
  }

  editarExcluir(treino : Treino){
    this.router.navigateByUrl("/editar", {state : {treino : treino}});
  }
  
}
