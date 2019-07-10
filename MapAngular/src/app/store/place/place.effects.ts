import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as placeActions from './place.actions';
import { PlacesService } from '../../api/places.service';

@Injectable()
export class PlaceEffects {

    loadPlaces$ = createEffect(() => this.actions$.pipe(
        ofType(placeActions.loadPlaces),
        mergeMap(() => this.placesService.getPlaces().pipe(
            map(places => placeActions.loadPlacesSuccess({ places })),
            catchError(e => of(placeActions.loadPlacesError({error: e})))
        ))
    ));

    addPlace$ = createEffect(() => this.actions$.pipe(
        ofType(placeActions.addPlace),
        mergeMap(({ place }) => this.placesService.addPlace(place).pipe(
            map(p => placeActions.addPlaceSuccess({ place: p })),
            catchError(e => of(placeActions.addPlaceError({ error: e })))
        ))
    ));

    updatePlace$ = createEffect(() => this.actions$.pipe(
        ofType(placeActions.updatePlace),
        mergeMap(({ place }) => this.placesService.updatePlace(place).pipe(
            map(p => placeActions.updatePlaceSuccess({ place: p })),
            catchError(e => of(placeActions.updatePlaceError({ error: e })))
        ))
    ));

    deletePlace$ = createEffect(() => this.actions$.pipe(
        ofType(placeActions.deletePlace),
        mergeMap(({ place }) => this.placesService.deletePlace(place.id).pipe(
            map(() => placeActions.deletePlaceSuccess({ place })),
            catchError(e => of(placeActions.deletePlaceError({ error: e })))
        ))
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly placesService: PlacesService
    ) { }
}
