# ngx-responsive-tools

Set of observables and template directives to track conventional screen breakpoints: `xs`, `sm`, `md`, `lg`, `xl`

Install the library
```
npm i ngx-responsive-tools
```

\
Include it in your app module:
```
...
import { NgxResponsiveToolsModule } from 'ngx-responsive-tools';
...
@NgModule({
  ...
  imports: [
    ...
    NgxResponsiveToolsModule
  ],
})
export class AppModule { }

```

\
Use responsive service in component files:

```
export class MyComponent {
  ...
  constructor(private responsive: NgxResponsiveToolsService) {
  
    this.responsive.xl$.pipe(take(1)).subscribe((isXl: boolean) => {
      if (isXl) {
        this.expandMenu();
      }
    });
    
  }  
}
```

\
In templates you can use responsive directive like this:
```
...
<div *ngxResponsive="'sm'">This is visible on sm screen size</div>
...
```
