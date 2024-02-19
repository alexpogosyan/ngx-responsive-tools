import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { NgxResponsiveToolsService } from "./ngx-responsive-tools.service";
import { Subscription, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Breakpoint } from "./ngx-responsive-tools.model";

@Directive({
  selector: "[ngxResponsive]",
})
export class NgxResponsiveToolsDirective {
  private hasView = false;
  private responsiveSub: Subscription = Subscription.EMPTY;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private ngxResponsiveService: NgxResponsiveToolsService
  ) {}

  @Input() set ngxResponsive(bps: Breakpoint | Breakpoint[]) {
    const breakpoints = Array.isArray(bps) ? bps : [bps];
    this.subscribeToObservables(breakpoints);
  }

  protected subscribeToObservables(breakpoints: Breakpoint[]) {
    const observables = breakpoints.map(
      (bp) => this.ngxResponsiveService[`${bp}$`]
    );

    this.responsiveSub = combineLatest(observables)
      .pipe(map((matches) => matches.some((match) => match)))
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
