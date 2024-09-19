import { CommonModule, NgFor } from '@angular/common';
import { Component, Pipe } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule,NgFor,CommonModule, RouterLink,RouterOutlet],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
products=[
  {id:1, name:'Product 1', price:100},
  {id:2, name:'Product 2', price:200},
  {id:3, name:'Product 3', price:300},
  {id:4, name:'Product 4', price:400},
  {id:5, name:'Product 5', price:500},
  {id:6, name:'Product 6', price:600},
  {id:7, name:'Product 7', price:700},
]
}
