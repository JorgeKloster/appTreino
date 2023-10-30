import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Treino } from 'src/app/model/entities/Treino';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listaDeTreinos : Treino[] = [];

  constructor(
    private router : Router,
    private firebase : FirebaseService
    ) {
    this.firebase.mostrarTodos()
    .subscribe(res => {
      this.listaDeTreinos = res.map(treino => {
        return{
          id: treino.payload.doc.id,
          ...treino.payload.doc.data() as any
        }as Treino
      }
      )
    })
  }

  irParaIncluir(){
    this.router.navigate(["/incluir"]);
  }

  detalhar(treino : Treino){
    this.router.navigateByUrl("/detalhar", {state : {treino: treino}});
  }

}
