import { Routes } from '@angular/router';


export const routes: Routes = [
    //{path: '', pathMatch: 'full', redirectTo: 'home'},
    //{path: 'home', component: AppComponent}
    // had this routed at first this way (the old angular way + lazy loading)
    // but the bundle size was too big without old angular lazy loading
    //so I now am using Angular 17's new deferrable views https://angular.dev/guide/defer
    // I found that the old angular ways was less clear and simply outdated. I hope my choice is okay for you!
];


