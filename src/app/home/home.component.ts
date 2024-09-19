import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReversePipe } from '../custom/reverse.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, ReversePipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title:string = 'Angular 18 Tutorial';
  subtitle:string='Full Course for Beginners';
  todayDate=new Date();
  salary=1000;
  _object={'name':'John', 'age':'30'};
  isDisabled=true;

  isActive=true;

  items=['1element', '2element', '3element', '4element', '5element'];

  view='about';

  handleClick(){
    this.isDisabled=false;
    this.isActive=!this.isActive;
    this.title='click Learn more in 3 seconds';
    setTimeout(()=>{
      this.isDisabled=true;
      this.title='Angular 18 Tutorial';
    }, 3000);
  }

  updateTitle(event:any){
    this.title=event.target.value;
  }
}
