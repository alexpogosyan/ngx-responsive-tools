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
Show content on one or more screen sizes in templates:
```
...
<div *ngxBreakpoint="'lg'">This is visible only on lg screen size</div>

<div *ngxBreakpoint="['xs', 'md']">This is visible only xs and md screen sizes</div>
...
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
