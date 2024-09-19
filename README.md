# Appunti Angular
### Installation and Setup App
```ts
npm install -g @angular/cli

ng new <project-name>

npm start o ng serve
```
### Essentials

in component.ts if --> @if
                else --> @else
                for --> @for

### event handling 
```ts
(tipoDiEvento)='funzione()'
```

è possibile passare i dati dell'evento:
```ts
(tipoDiEvento)='funzione($event)'
```

### Services
sono pezzi di codice che si possono riusare e che possono essere injected

esempio struttura:
```ts
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  add(x: number, y: number) {
    return x + y;
  }
}
```


come usarlo:
1. importare il service
2. dichiarare un class field in cui il service viene injected

esempio:
```ts
    import { Component, inject } from '@angular/core';
    import { CalculatorService } from './calculator.service';
    @Component({
    selector: 'app-receipt',
    template: `<h1>The total is {{ totalCost }}</h1>`,
    })
    export class Receipt {
    private calculatorService = inject(CalculatorService);
    totalCost = this.calculatorService.add(50, 25);
    }
```

## Components
i componenti sono strutturati:
1.importazione dipendenze
2.dichiarazione componente 
```js 
@Component ({
    selector:'app-component', //nome del tag da usare per vederlo in pagina

    //definizione di template e style nello stesso file (magari per bottoni o elementi piccoli)
    template:`<div>contenuto componente</div>`, 
    style: `div{background-color:red}`,

    //definizione di template e style in file separati
    templateUrl:'./percorso/template.component.html',
    styleUrl:'./percorso/style.component.css' oppure styleUrls:[array di percorsi a diversi file di stile]

})
``` 
3. esportazione della classe del componente
```ts
export class MyComponent{
    dichiaro variabili,funzioni,hooks...
}
```

### accepting data with input properties
```ts
@Component({...})
export class MyComponent{
    @Input({required:true,transform:formattingFn,

    }) value=0; //config object pass in Input
    formattingFn(value:number){return any};
    //formattando posso ricevere in input un valore di un tipo e ritornare lo stesso valore formattato e convertito in un altro tipo
    ...
}
```

```ts
<my-component [value]='50'>
```

### metodo alternativo:
```ts
@Component({
...
input:['value',...]
...
})

export class MyComponent extends MainComponent{}
```

## Custom events with outputs
- è possibile definire un evento custom assegnando una proprietà ad un nuovo EventEmitter e aggiungendo @Output

```ts
//componente figlio
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="sendData()">Invia dati al padre</button>
  `
})
export class ChildComponent {
  // Dichiarazione dell'evento che sarà emesso
  @Output() dataEmitted = new EventEmitter<string>();

  sendData() {
    const data = 'Dati dal componente figlio';
    this.dataEmitted.emit(data); // Emissione dell'evento con i dati
  }
}

```

```ts
// componente padre
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child (dataEmitted)="onDataReceived($event)"></app-child>
    <p>Dato ricevuto: {{ receivedData }}</p>
  `
})
export class ParentComponent {
  receivedData: string;

  // Questo metodo viene eseguito quando il figlio emette l'evento
  onDataReceived(data: string) {
    this.receivedData = data;
    console.log('Dati ricevuti dal figlio:', data);
  }
}


```

## Content projection with ng-content
- se voglio creare un componente che faccia da contenitore ad altri componenti (es. Card) posso usare <ng-content/> come placeholder in modo da evidenziare dove dovrà andare il contenuto

```ts
@Component({
  selector: 'custom-card',
  template: '<div class="card-shadow"> <!-- card content goes here --> </div>',
})
export class CustomCard {/* ... */}
// diventa
@Component({
  selector: 'custom-card',
  template: '<div class="card-shadow"> <ng-content></ng-content> </div>',
})
export class CustomCard {/* ... */}
```

uso:
```html
<!-- Using the component -->
<custom-card>
  <p>This is the projected content</p>
</custom-card>
```

### multiple content placeholder
```html
<!-- Component template -->
<div class="card-shadow">
  <ng-content select="card-title"></ng-content>
  <div class="card-divider"></div>
  <ng-content select="card-body"></ng-content>
</div>

<!-- Using the component -->
<custom-card>
  <card-title>Hello</card-title>
  <card-body>Welcome to the example</card-body>
</custom-card>

<!-- Rendered DOM -->
<custom-card>
  <div class="card-shadow">
    <card-title>Hello</card-title>
    <div class="card-divider"></div>
    <card-body>Welcome to the example</card-body>
  </div>
</custom-card>
```

# Modelli
- si basano su sintassi HTML
- gli elementi componenti e directive possono essere auto chiusi <user-profile/>
- gli attributi con determinati caratteri ('()', '[]',...) hanno un significato speciale:
    - document binding e aggiunta di event listener
- il carattere @ aggiunge un comportamento dinamico come il flusso di controllo

### Binding testo dinamico, proprietà e attributi

```html
<p>{{paragraph}}</p>
<!-- NB -> i valori interpolati con l'uso di {{}} vengono convertiti in string -->
```

```html
<button [disabled]='isDisabled'></button>
<!-- il bottone verrà disattivato se isDisabled === true -->
<!-- non posso usare la sintassi {{}} perchè conertendolo in string l'output sarà sempre true -->
```

```html
<button [disabled]='isDisabled'></button>
```

passare proprietà tra componenti:
```html
<my-listbox [value]='mySelection'></my-listbox>
<!-- ogni volta che mySelection cambia, l'istanza di MyListbox si aggiorna -->
```

### Adding Event Listener
```html
<button (click)='handleClick()'></button>
```

### Two-way Binding
1. importo FormModule
2. uso [(ngModel)]='value'

## between components
L'elemento figlio deve contenere:
- @Input
- @Output event emitter che si deve chiamare come la proprietà in input +Change (deve avere anche lo stesso tipo)

L'elemento padre deve:
- usare la sintassi del two-way binding ma con il nome della proprietà in input
- specificare la proprietà corrispondente in cui il valore sarà assegnato
```ts
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent],
  template: `
    <main>
      <h1>Counter: {{ initialCount }}</h1>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```
```ts
// './counter/counter.component.ts';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="updateCount(-1)">-</button>
    <span>{{ count }}</span>
    <button (click)="updateCount(+1)">+</button>
  `,
})
export class CounterComponent {
  @Input() count: number;
  @Output() countChange = new EventEmitter<number>();
  updateCount(amount: number): void {
    this.count += amount;
    this.countChange.emit(this.count);
  }
}
```

## Control flow
### conditionally display content (@if,@else-if,@else)
```html
@if (a > b) {
   <p>{{a}} is greater than {{b}} </p>
} @else if (b > a) {
   <p>{{a}} is less than {{b}} </p>
} @else {
   <p>{{a}} is equal to {{b}} </p>
}
```

### repeat content (@for)

```html

@for (item of items; track item.id) {
  {{ item.name }}
}
```

#### perchè track in @for?
funziona come una key -> permette di dare un valore univoco ad ogni elemento dell'array stampato.

#### providing a fallback content
- se il contenuto dell'array è vuoto si può usare @empty
```html
@for (item of items; track item.name) {
  <li> {{ item.name }}</li>
} @empty {
  <li> There are no items.</li>
}
```

### conditionally display content using @switch
```html
@switch (userPermissions) {
  @case ('admin') {
    <app-admin-dashboard />
  }
  @case ('reviewer') {
    <app-reviewer-dashboard />
  }
  @case ('editor') {
    <app-editor-dashboard />
  }
  @default {
    <app-viewer-dashboard />
  }
}
```

## Pipes
- sono operatori speciali che permettono di trasformare i dati in modo dichiarativo
- dichiaro una funzione che formatta un dato -> la importo nel componente -> la uso {{text| toUppercase}}

```ts
import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  template: `
    <main>
       <!-- Transform the company name to title-case and
       transform the purchasedOn date to a locale-formatted string -->
<h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1>
        <!-- Transform the amount to a currency-formatted string -->
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class ShoppingCartComponent {
  amount = 123.45;
  company = 'acme corporation';
  purchasedOn = '2024-07-08';
}
```

Built-in Pipes
|nome|cosa fa|
|-|-|
|AsyncPipe| legge un valore da una Promise|
|CurrencyPipe| formatta in moneta|
|DataPipe|formatta le date|
|DecimalPipe|trasforma i numeri in decimali|
|I18nPluralPipe| trasforma un valore in una string che pluralizza il valore in base alle regole locali|
|I18nSelectPipe| trasforma una key in un selettore e ritorna il valore desiderato|
|JsonPipe| usa il metodo JSON.stringify|
|KeyValuePipe| object/map in array chiave:valore|
|LowerCasePipe| text to lower case|
|PercentPipe| number to percentage|
|SlicePipe| crea un array o string contenente un set di elementi|
|TitleCasePipe| text to title case|
|UpperCasePipe| text to upper case|

Using pipes:
```html
<p>{{amount | currency}}</p>

<!-- using multiple pipes  -->
<p>{{scheduldOn | date | uppercase}}</p>

<!-- passing parameters -->
<p>The event will occur at {{ scheduledOn | date:'hh:mm' }}.</p>

<!-- i pipes hanno meno priorità rispetto alle altre operazioni -->
<p>{{ (isAdmin ? 'Access granted' : 'Access denied') | uppercase }}</p>

```

### Create custom Pipes

```ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'myCustomTransformation',
  standalone: true
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string): string {
    return `My custom transformation of ${value}.`
  }
}
```

### Grouping elements with <ng-container></ng-container>
- l'elemento <ng-container></ng-container> agisce come placeholder per renderizzare contenuto dinamicamente
- posso usare NgComponentOutlet per renderizzare un componente al posto di <ng-container>

```ts
// NgComponentOutlet renderizza condizionalmente o la ProfilePage dell'admin o quella basica
@Component({
  template: `
    <h2>Your profile</h2>
    <ng-container [ngComponentOutlet]="profileComponent()" />
  `
})
export class UserProfile {
  isAdmin = input(false);
  profileComponent = computed(() => this.isAdmin() ? AdminProfile : BasicUserProfile);
}
```

- posso usare NgTemplateOutlet per renderizzare un fragment al posto di <ng-container>

```ts
// NgComponentOutlet renderizza condizionalmente o la ProfilePage dell'admin o quella basica
@Component({
  template: `
    <h2>Your profile</h2>
    <ng-container [ngTemplateOutlet]="profileTemplate()" />
    <ng-template #admin>This is the admin profile</ng-template>
    <ng-template #basic>This is the basic profile</ng-template>
  `
})
export class UserProfile {
  isAdmin = input(false);
  adminTemplate = viewChild('admin', {read: TemplateRef});
  basicTemplate = viewChild('basic', {read: TemplateRef});
  profileTemplate = computed(() => this.isAdmin() ? adminTemplate : basicTemplate);
}
```

- posso usarlo anche in combo con delle structural directives (ngIf, ngFor)

```html
<ng-container *ngIf="permissions == 'admin'">
  <h1>Admin Dashboard</h1>
  <admin-infographic></admin-infographic>
</ng-container>
<ng-container *ngFor="let item of items; index as i; trackBy: trackByFn">
  <h2>{{ item.title }}</h2>
  <p>{{ item.description }}</p>
</ng-container>
```

# Directives
- NgClass -> aggiunge o rimuove un set di classi CSS 
- NgStyle -> aggiunge o rimuove un set di stili in linea
- NgModel -> aggunge two-way data binding ad un elemento form HTML (<input/>)

# Dipendency Injection
- creo un service 
    ```bash
    ng g s nomeService
    ```
- importo le dipendenze che più componenti hanno in comune (es HttpClient, AuthService)

    ```ts
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { AuthService } from './auth.service';  // Un altro servizio di esempio

    @Injectable({
    providedIn: 'root' // Questo fa sì che il servizio sia disponibile a livello globale nell'app
    })
    export class SharedService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    fetchData() {
        const userId = this.authService.getUserId();
        return this.http.get(`/api/data/${userId}`);
    }

    isLoggedIn() {
        return this.authService.isAuthenticated();
    }
    }
    ```
- iniettare il service nel componente tramite il costruttore

    ```ts
        <!-- component A -->
    import { Component } from '@angular/core';
    import { SharedService } from './shared.service';

    @Component({
    selector: 'app-component-a',
    template: `<div *ngIf="loggedIn">Welcome!</div>`
    })
    export class ComponentA {
    loggedIn: boolean = false;

    constructor(private sharedService: SharedService) {
        // Uso del metodo del servizio
        this.loggedIn = this.sharedService.isLoggedIn();
    }
    }
        <!-- component B -->
    import { Component, OnInit } from '@angular/core';
    import { SharedService } from './shared.service';

    @Component({
    selector: 'app-component-b',
    template: `<div>{{ data }}</div>`
    })
    export class ComponentB implements OnInit {
    data: any;

    constructor(private sharedService: SharedService) {}

    ngOnInit() {
        // Uso del metodo del servizio
        this.sharedService.fetchData().subscribe(response => {
        this.data = response;
        });
    }
    }


    ```
- testare il servizio (opzionale)


# Routing
- aggiungere il provideRouter nel file app.config.ts
```ts
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
};
```
- set up a routes array
```ts
import { Routes } from '@angular/router';
export const routes: Routes = [];
```
- define routes in Routes array
```ts
// l'ordine delle rotte deve essere da quella più specifica a quella meno specifica
const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'products', component: ProductsPage },
  { path: 'products/new', component: ProductFormPage },
  { path: 'products/edit/:id', component: ProductFormPage },
  { path: 'products/:id', component: ProductDetailsPage },
];
```
- aggiungere le rotte nelle pagine e creare con dei RouterLink che portano alle rotte
- usare un <router-outlet> per renderizzare il contenuto della pagina di arrivo (prima e dopo è possibile inserire del contenuto 'statico' es. header e footer)


### Getting Route information
- usare withComponentInputBinding con provideRouter oppure bindToComponentInputs del RouterModule.forRoot

1. withComponentInputBinding: aggiungere withComponentInputBinding nel metodo provideRouter (app.config.ts)

2. add an Input to the component: aggiungere un Input che si chiama con il nome del parametro da dover ricavare
```ts
@Input()
set id(id: string) {
  this.id$ = this.service.getId(id);
}
```

3. definire delle rotte di fallback (errori)
```ts
{path:'**',component:<ErrorPage/>}
```
- è possibile reindirizzare l'utente a una rotta preimpostata
```ts
    const routes: Routes = [
    { path: 'first-component', component: FirstComponent },
    { path: 'second-component', component: SecondComponent },
    { path: '',   redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
    ];
```

4. si può creare delle rotte figlie di una rotta genitore
- è possibile dare un titolo alla rotta
```ts
    const routes: Routes = [
  {
    path: 'first-component',
    title: 'First Component',
    component: FirstComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'child-a', // child route path
        title: 'Child a', 
        component: ChildAComponent, // child route component that the router renders
      },
      {
        path: 'child-b',
        title: 'Child b',
        component: ChildBComponent, // another child route component that the router renders
      },
    ],
  },
];
```
### Accessing query parameters and fragments
1. imprtare nel componente da cui voglio navigare:

```ts
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

```
2. inject ActivateRoute
```ts
constructor(private route: ActivatedRoute) {}

```

esempio url: http://example.com/page?name=John&id=123#section2
I query parameters sono: name=John e id=123.
Il fragment è: section2.
```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-example',
  template: `
    <p>Query Parameter: {{ name }}</p>
    <p>Fragment: {{ fragment }}</p>
  `
})
export class ExampleComponent implements OnInit {
  name: string | null = '';
  fragment: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Accesso ai query parameters tramite snapshot
    this.name = this.route.snapshot.queryParamMap.get('name');

    // Accesso al fragment tramite snapshot
    this.fragment = this.route.snapshot.fragment;
  }
}
```

### Preventing unauthorized access
- usare route guards per evitare l'accesso a utenti senza autorizzazione
1. creazione guard
```bash
    ng generate guard nome-guard
```

all'interno del file aggiungere la funzione di guardia da utilizzare:
- canActivate
- canActivateChild
- canDeactivate
- canMatch
- resolve
- canLoad

```ts
   export const yourGuardFunction: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
      // your  logic goes here
  }
```
nel routing module aggiungere la tipologia di guardia scelta e la funzione a cui far riferimento:
```ts
{
  path: '/your-path',
  component: YourComponent,
  canActivate: [yourGuardFunction],
}
```

### Link parameters array
- un link parameters array contiene:
    - il percorso della rotta destinazione
    - parametri della rotta richiesti o opzionali che andranno nella rotta URL
```ts
<a [routerLink]="['/heroes']">Heroes</a>

// viene specificato un parametro 
<a [routerLink]="['/hero', hero.id]">
  <span class="badge">{{ hero.id }}</span>{{ hero.name }}
</a>

// si può inserire parametri opzionali in un oggetto
<a [routerLink]="['/crisis-center', { foo: 'foo' }]">Crisis Center</a>

<a [routerLink]="['/crisis-center']">Crisis Center</a>
```

# Forms
- ci sono 2 tipi:
  - template driven -> basati sui template
  - reactive -> basati sui modelli

### 1. template driven forms
- sono gestiti dal template HTML
- angular gestisce il binding dei dati
- facili da configurare ma offrono meno controllo rispetto ai reactive forms

#### Passaggi
1. creare il modulo dei form 
  - importo FormModule nel modulo dell'applicazione (di solito app.module.ts)

  ```ts
  import { FormsModule } from '@angular/forms';

  @NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
  })
  export class AppModule {}

  ```

2. creare un form HTML
  - usare gli attributi ngModel per collegare i cambi del form al componente
  ```html
  <form (ngSubmit)="onSubmit()">
    <input type="text" name="username" [(ngModel)]="user.name" required>
    <input type="email" name="email" [(ngModel)]="user.email" required>
    <button type="submit">Submit</button>
  </form>
  ```

3. Gestire i dati nel componente
  - creo un oggetto per raccogliere i dati

  ```ts
  export class AppComponent {
    user = { name: '', email: '' };

    onSubmit() {
      console.log(this.user);
    }
  }

  ```

### 2. Reactive Forms
- offrono maggiore controllo e prevedibilità rispetto ai template driven forms.
- il form è dichiarato e gestito nel file typescript attraverso modelli espliciti

#### Passaggi
1. importare ReactiveFormsModule nel modulo dell'applicazione

  ```ts
  import { ReactiveFormsModule } from '@angular/forms';

  @NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, ReactiveFormsModule],
    bootstrap: [AppComponent]
  })
  export class AppModule {}

  ```

2. creare un form nel componente utilizzando FormGroup e FormControl

  ```ts
  import { Component } from '@angular/core';
  import { FormGroup, FormControl, Validators } from '@angular/forms';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
  })
  export class AppComponent {
    userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    onSubmit() {
      console.log(this.userForm.value);
    }
  }

  ```
3. creare il form nel template HTML e collegare il form al componente usando formGroup e formControlName
  ```html
  <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
    <input formControlName="name" type="text" placeholder="Name">
    <input formControlName="email" type="email" placeholder="Email">
    <button type="submit" [disabled]="userForm.invalid">Submit</button>
  </form>

  ```