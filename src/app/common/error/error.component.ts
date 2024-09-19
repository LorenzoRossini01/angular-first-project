import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgIf,RouterLink,MatButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
error ={
  title: 'An Error Occurred',
  statusCode: 404,
  description: 'La risorsa richiesta non è disponibile o non esiste.',
  redirect: '/',
  redirectMessage: 'Torna alla home page.',
  backButton: 'Torna indietro',
}
}
