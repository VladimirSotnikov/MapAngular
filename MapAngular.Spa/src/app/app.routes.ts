import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./places/places.module').then(m => m.PlacesModule),
  }
];
