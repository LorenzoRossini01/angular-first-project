import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  isEditing: boolean = false;

  pageTitle=!this.isEditing?'Add New Product':'Edit product';

  product= {id:'', name:'bho', price:0 } // initialize product object  // consider using a backend service for storing and retrieving product data  //;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Ottenere l'ID dal percorso
    const url = this.router.url;
    console.log('URL corrente:', url);

    if (url.includes('edit')) {
      this.isEditing = true; // Mostra le informazioni se l'URL contiene 'special'
    } else {
      this.isEditing = false;
    }
  
    // Ottenere i parametri di query
    this.route.queryParams.subscribe((queryParams) => {
      console.log('Dati dai queryParams:', queryParams);
      this.product = {
        id: queryParams['id'] || '', // Verifica se esiste il parametro 'id', altrimenti usa stringa vuota
        name: queryParams['name'] || '', // Default a 'bho' se non specificato
        price: queryParams['price'] || 0 // Converte 'price' a numero
      };
    });
  }
  onSubmit(){
    console.log('Form submitted')
    console.log(this.product);
  }

  

}
