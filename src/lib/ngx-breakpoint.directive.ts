import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { Observable, Subscription, combineLatest, of } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { NgxResponsiveToolsService } from "./ngx-responsive-tools.service";

@Directive({
  selector: "[ngxBreakpoint]",
})
export class NgxBreakpointDirective {
  private hasView = false;
  private responsiveSub: Subscription = Subscription.EMPTY;

  @Input() set ngxBreakpoint(sizeOrSizes: string | string[]) {
    const sizes = Array.isArray(sizeOrSizes) ? sizeOrSizes : [sizeOrSizes];
    this.subscribeToObservables(sizes);
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<Object>,
    private ngxResponsiveService: NgxResponsiveToolsService
  ) {}

  getBreakpointObservable(size: string): Observable<boolean> {
    const breakpointObservable = (this.ngxResponsiveService as any)[size];
    if (breakpointObservable) {
      return breakpointObservable
    } else {
      console.error('Invalid size:', size);
      return of(false);
    }
  }

  protected subscribeToObservables(sizes: string[]) {
    const observables = sizes.map((size) => this.getBreakpointObservable(`${size}$`));

    this.responsiveSub = combineLatest(observables)
      .pipe(
        map((matches) => matches.some((match) => match)),
        shareReplay(1)
      )
      .subscribe((match) => {
        if (match && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!match && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }

  ngOnDestroy() {
    this.responsiveSub?.unsubscribe();
  }
}
