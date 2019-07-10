import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PlaceDto } from '../api/place-dto';
import { IAppState, getPlaces } from '../store';
import { loadPlaces, deletePlace } from '../store/place/place.actions';

@Component({
    selector: 'places',
    templateUrl: './places.template.html'
})
export class PlacesComponent {

    places$ = this.store.pipe(select(getPlaces));

    constructor(private readonly store: Store<IAppState>) {
        store.dispatch(loadPlaces());
    }

    deletePlace(place: PlaceDto): void {
        this.store.dispatch(deletePlace({ place }));
    }
}
