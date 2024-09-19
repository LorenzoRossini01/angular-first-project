import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';



export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path:'about', loadComponent:()=>import('./common/about/about.component').then(m=>m.AboutComponent) },
    {path:'products', loadComponent:()=>import('./products/products.component').then(m=>m.ProductsComponent), children:[
        {path:'add', loadComponent:()=>import('./products/form/form.component').then(m=>m.FormComponent) }, 
        {path:'edit/:id', loadComponent:()=>import('./products/form/form.component').then(m=>m.FormComponent) } ,
        {path:':id', loadComponent:()=>import('./product/product.component').then(m=>m.ProductComponent) , pathMatch: 'full', data: {idPattern: '[0-9]+'}},
    ]},
    {path:'**',loadComponent:()=>import('./common/error/error.component').then(m=>m.ErrorComponent) } // 404 page
];
