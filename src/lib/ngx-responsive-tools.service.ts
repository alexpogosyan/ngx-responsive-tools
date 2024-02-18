import { Injectable } from "@angular/core";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NgxResponsiveToolsService {
  xs$ = this.breakpointObserver
    .observe("(max-width: 479px)")
    .pipe(map((bp: BreakpointState) => bp?.matches));

  sm$ = this.breakpointObserver
    .observe("(min-width: 480px)")
    .pipe(map((bp: BreakpointState) => bp?.matches));

  md$ = this.breakpointObserver
    .observe("(min-width: 768px)")
    .pipe(map((bp: BreakpointState) => bp?.matches));

  lg$ = this.breakpointObserver
    .observe("(min-width: 1024px)")
    .pipe(map((bp: BreakpointState) => bp?.matches));

  xl$ = this.breakpointObserver
    .observe("(min-width: 1200px)")
    .pipe(map((bp: BreakpointState) => bp?.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
