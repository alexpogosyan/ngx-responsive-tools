import { Injectable } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { map, shareReplay, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Breakpoint } from "./ngx-responsive-tools.model";

@Injectable({
  providedIn: "root",
})
export class NgxResponsiveToolsService {
  private queries = {
    [Breakpoint.XlOnly]: '(min-width: 1200px)',
    [Breakpoint.XlUp]: '(min-width: 1200px)',
    [Breakpoint.XlDown]: '(max-width: 9999px)',

    [Breakpoint.LgOnly]: '(min-width: 1024px) and (max-width: 1199px)',
    [Breakpoint.LgUp]: '(min-width: 1024px)',
    [Breakpoint.LgDown]: '(max-width: 1199px)',

    [Breakpoint.MdOnly]: '(min-width: 768px) and (max-width: 1023px)',
    [Breakpoint.MdDown]: '(max-width: 1023px)',
    [Breakpoint.MdUp]: '(min-width: 768px)',

    [Breakpoint.SmOnly]: '(min-width: 480px) and (max-width: 767px)',
    [Breakpoint.SmDown]: '(max-width: 767px)',
    [Breakpoint.SmUp]: '(min-width: 480px)',

    [Breakpoint.XsOnly]: '(min-width: 1px) and (max-width: 479px)',
    [Breakpoint.XsDown]: '(max-width: 479px)',
    [Breakpoint.XsUp]: '(min-width: 1px)'
  };
  
  private destroy$: Subject<void> = new Subject<void>();

  xl$ = this.observe(Breakpoint.XlOnly);
  xlUp$ = this.observe(Breakpoint.XlUp);
  xlDown$ = this.observe(Breakpoint.XlDown);

  lg$ = this.observe(Breakpoint.LgOnly);
  lgUp$ = this.observe(Breakpoint.LgUp);
  lgDown$ = this.observe(Breakpoint.LgDown);

  md$ = this.observe(Breakpoint.MdOnly);
  mdUp$ = this.observe(Breakpoint.MdUp);
  mdDown$ = this.observe(Breakpoint.MdDown);

  sm$ = this.observe(Breakpoint.SmOnly);
  smUp$ = this.observe(Breakpoint.SmUp);
  smDown$ = this.observe(Breakpoint.SmDown);

  xs$ = this.observe(Breakpoint.XsOnly);
  xsUp$ = this.observe(Breakpoint.XsUp);
  xsDown$ = this.observe(Breakpoint.XsDown);

  constructor(private breakpointObserver: BreakpointObserver) {}

  private observe(breakpoint: Breakpoint) {
    return this.breakpointObserver
      .observe([this.queries[breakpoint]])
      .pipe(takeUntil(this.destroy$), map(x => x?.matches), shareReplay(1));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }  
}
