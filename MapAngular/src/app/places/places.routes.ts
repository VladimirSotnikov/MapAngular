import { Routes } from '@angular/router';
import { PlacesComponent } from './places.component';
import { PlaceComponent } from './place/place.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PlacesComponent
    },
    {
        path: 'place',
        component: PlaceComponent
    },
    {
        path: 'place/:id',
        component: PlaceComponent
    }
];
