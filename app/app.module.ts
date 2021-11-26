import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonasInputComponent } from './personas-input/personas-input.component';
import { PersonasOutputComponent } from './personas-output/personas-output.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PersonaDetalleComponent } from './persona-detalle/persona-detalle.component';




import { MatDialogModule } from '@angular/material/dialog';
import { ReactivoDetallePersonaComponent } from './reactivo-detalle-persona/reactivo-detalle-persona.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';



 
@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    PersonasInputComponent,
    PersonasOutputComponent,
    PersonaDetalleComponent,
    ReactivoDetallePersonaComponent,
    MessagesComponent
  ],
  imports: [
    HttpClientModule,
    MatSliderModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
