import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PersonaOutput } from '../personaOutput';
import { PersonasService } from '../personas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-persona-detalle',
  templateUrl: './persona-detalle.component.html',
  styleUrls: ['./persona-detalle.component.css']
})
export class PersonaDetalleComponent implements OnInit {
  editable:boolean=true;

  /*
  profileForm = this.fb.group({
   
    user: ['',Validators.required],
    password: [''],
    name: [''],
    surname: [''],
    company_email: [''],
    personal_email: [''],
    city: [''],
    imagen_url: [''],
    termination_date: [''],
    created_date: [''],
    active: ['']
    
  });*/

  profileForm = new FormGroup({
    //id: new FormControl(),
    user: new FormControl('',[Validators.minLength(6),Validators.required,Validators.maxLength(10)]),
    password: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    company_email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    personal_email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    city: new FormControl('',Validators.required),
    imagen_url: new FormControl(),
    termination_date: new FormControl(),
    created_date: new FormControl(),
    active: new FormControl()
  });
  constructor(public dialogRef: MatDialogRef<PersonaDetalleComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: PersonaOutput
    ,private personasService : PersonasService,private fb: FormBuilder
    ) { 
    } 

  ngOnInit(): void {
    this.editable=this.personasService.getEditable();
  }

  cancelar() {
    this.dialogRef.close();
  }

  aceptar() {
  
  }

  

}
