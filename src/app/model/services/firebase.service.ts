import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Treino } from '../entities/Treino';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATHtreino : string = "treino";
  private PATHexercicios : string = "exercicio";

  constructor(private firestore : AngularFirestore,
    private storage : AngularFireStorage) { }

  incluir(treino: Treino) {
    return this.firestore.collection(this.PATHtreino)
    .add({grupoMusc : treino.grupoMusc, diaSemana : treino.diaSemana,
    horario : treino.horario, duracao : treino.duracao, downloadURL : treino.downloadURL});
  }
  mostrarTodos() {
    return this.firestore.collection(this.PATHtreino).snapshotChanges();
  }
 
  atualizar(treino : Treino , id : string){
    return this.firestore.collection(this.PATHtreino).doc(id)
    .update({grupoMusc : treino.grupoMusc, diaSemana : treino.diaSemana,
      horario : treino.horario, duracao : treino.duracao, downloadURL : treino.downloadURL});
  }
  
  deletar(id : string){
    return this.firestore.collection(this.PATHtreino).doc(id)
    .delete();
  }

  mostrarTodosExercicios() {
    return this.firestore.collection(this.PATHexercicios).snapshotChanges();
  }

  inserirFoto(imagem : any, treino : Treino) {
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo Não Suportado')
      return;
    }
    const path = `images/${treino.grupoMusc}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    task.snapshotChanges().pipe(
      finalize(() =>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp => {
          treino.downloadURL = resp;
          if(!treino.id){
            this.incluir(treino);
          }else{
            this.atualizar(treino,treino.id);
          }
        })
      })
    ).subscribe();
    return task;
  }
}
