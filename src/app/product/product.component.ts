import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, MatButtonModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: string=''; // Dichiara il tipo corretto
  product: any; // Variabile per memorizzare i dati passati

  // Inietta sia ActivatedRoute che Router e ProductService
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // // Ottenere l'ID dal percorso
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      console.log('Product ID:', this.productId);
    });

    // Ottenere i parametri di query
    this.route.queryParams.subscribe((queryParams) => {
      console.log('Dati dai queryParams:', queryParams);
      this.product = queryParams;
    });
  }

  // Setter per l'ID del prodotto

}
