import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit,OnChanges,DoCheck,AfterContentChecked,AfterContentInit,AfterViewChecked,AfterViewInit {


  ngOnInit(): void {
    console.log('AboutComponent: ngOnInit');
  }
  ngOnChanges(): void {
    console.log('AboutComponent: ngOnChanges');
  }
  ngDoCheck(): void {
    console.log('AboutComponent: ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('AboutComponent: ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('AboutComponent: ngAfterContentChecked');
  }
  
  ngAfterViewInit(): void {
    console.log('AboutComponent: ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('AboutComponent: ngAfterViewChecked');
  }


}
