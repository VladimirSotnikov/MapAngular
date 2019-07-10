import { Routes } from '@angular/router';
import { PlacesComponent } from './places.component';
import { PlaceComponent } from './place/place.component';

export const routes: Routes = [
    {
        path: '',
        component: PlacesComponent,
        children: [
            {
                path: 'place',
                component: PlaceComponent
            },
            {
                path: 'place/:id',
                component: PlaceComponent
            }
        ]
    }
];
