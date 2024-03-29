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
    [Breakpoint.XlOnly]: '(min-width: 1225px)',
    [Breakpoint.XlUp]: '(min-width: 1225px)',
    [Breakpoint.XlDown]: '(max-width: 3840px)',

    [Breakpoint.LgOnly]: '(min-width: 960px) and (max-width: 1224px)',
    [Breakpoint.LgUp]: '(min-width: 960px)',
    [Breakpoint.LgDown]: '(max-width: 1224px)',

    [Breakpoint.MdOnly]: '(min-width: 600px) and (max-width: 959px)',
    [Breakpoint.MdDown]: '(max-width: 959px)',
    [Breakpoint.MdUp]: '(min-width: 600px)',

    [Breakpoint.SmOnly]: '(min-width: 521px) and (max-width: 599px)',
    [Breakpoint.SmDown]: '(max-width: 599px)',
    [Breakpoint.SmUp]: '(min-width: 521px)',

    [Breakpoint.XsOnly]: '(min-width: 1px) and (max-width: 520px)',
    [Breakpoint.XsDown]: '(max-width: 520px)',
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
