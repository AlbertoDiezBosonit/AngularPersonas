import { Injectable } from '@angular/core';
import { PersonaOutput } from './personaOutput';
import { Observable, of } from 'rxjs'; // para llamadas asincronas
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { MessageService } from './message.service'; // para ir metiendo los mensajes

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private Url = 'http://localhost:8080/persona';  // URL to web api
  private editable:boolean=true;

  constructor( private http: HttpClient,private messageService: MessageService) { }

  getEditable(){
    return this.editable;
  }

  setEditable(editable:boolean){
    this.editable=editable;
  }

  getPersonasOutput(): Observable< PersonaOutput[]> {
    let retorno=this.http.get<PersonaOutput[]>(this.Url)
    .pipe( // esto es para la gestion de errores
      catchError(this.handleError<PersonaOutput[]>('getHeroes', []))
    );// luego queda hacer el suscribe
    //retorno.subscribe(ps => {alert(personas );personas = ps; alert(personas ); tabla1.renderRows();});
    this.messageService.add('Personas leidas');
    return retorno;
  }

  getPersonasOutputPorNombre(nombre : string): Observable< PersonaOutput[]> {
    let retorno= this.http.get<PersonaOutput[]>(this.Url+'/nombre/'+nombre)
    .pipe( // esto es para la gestion de errores
      catchError(this.handleError<PersonaOutput[]>('getHeroes', []))
    );
    this.messageService.add('Se busca por nombre');
    return retorno;
  }

  status:string ='';

  InsertaPersona(p:PersonaOutput,aux:PersonaOutput,tabla1: MatTable<PersonaOutput[]>,personas : PersonaOutput[]){
    //alert(this.Url+"/addPersona");
    this.status='';
    let retorno=this.http.post<PersonaOutput>(this.Url+"/addPersona",p).pipe(
      catchError(this.handleError('addPersona', p))
    )
    .subscribe(data => {
      if(this.status!=''){    
        alert('Error al insertar la línea');
      }
      else{
        p.id = data.id; // aceptamos la id asignada en la base de datos        
        personas.push(aux);
        tabla1.renderRows();
        this.messageService.add('Se inserta una persona');
      }
    })
    return retorno;
  }

  ActualizaPersona(p:PersonaOutput, aCambiar : PersonaOutput[],j:number, tabla1: MatTable<PersonaOutput[]>){
    this.status='';
    return this.http.put<PersonaOutput>(this.Url+'/'+p.id,p)
      .pipe(
        catchError(this.handleError<PersonaOutput[]>('Error al actualizar la línea', []))
      )
      .subscribe((data) =>{ 
        if(this.status!=''){
          alert('Error al actualizar la fila');
        }
        else{
          aCambiar[j]=p;
          tabla1.renderRows();
          this.messageService.add('Se inserta la persona: '+p.name);
        }
      });
  }

  EliminaPersonas(id : string,personas : PersonaOutput[],j:number,tabla1: MatTable<PersonaOutput[]>) {
    let retorno= this.http.delete(this.Url+'/'+id).pipe(catchError(this.handleError<PersonaOutput>('Error al borrar persona'))).pipe(
      catchError(this.handleError<PersonaOutput[]>('Error al eliminar la línea', []))
    )
    .subscribe( (data:any)=>{ 
        if(data===undefined){
          alert("Error al eliminar la fila");
        }
        else{
          this.messageService.add('Se elimina la persona: '+personas[j].name);
          personas.splice(j,1);
          tabla1.renderRows();        
        }
      }
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //alert("error: "+`${operation} failed: ${error.message}`);
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.status="error: "+`${operation} failed: ${error.message}`;
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Service: ${message}`);
  }
  
}
