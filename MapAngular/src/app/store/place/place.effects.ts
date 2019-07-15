import { Injectable } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, filter, tap } from 'rxjs/operators';
import * as placeActions from './place.actions';
import { PlacesService } from '../../api/places.service';

@Injectable()
export class PlaceEffects {

    loadPlaces$ = createEffect(() => this.actions$.pipe(
        ofType(placeActions.loadPlaces),
        mergeMap(() => this.placesService.getPlaces().pipe(
            map(places => placeActions.loadPlacesSuccess({ places })),
            catchError(e => of(placeActions.loadPlacesError({ error: e })))
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

    deletePlaceSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(placeActions.deletePlaceSuccess),
        tap(() => {
            this.router.navigate(['/']);
        })), { dispatch: false }
    );

    addPlaceSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(placeActions.addPlaceSuccess),
        tap(({ place }) => {
            this.router.navigate(['/place', place.id]);
        })), { dispatch: false }
    );

    routerNavigated$ = createEffect(() => this.router.events.pipe(
        filter(event => event instanceof ActivationEnd && event.snapshot && event.snapshot.component && event.snapshot.component['name'] === 'PlaceComponent'),
        mergeMap(event => of(
            placeActions.selectPlace({ id: parseInt(event['snapshot'].params.id) })
        ).pipe(
            catchError(() => of(placeActions.unselectPlace()))
        ))
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly placesService: PlacesService,
        private readonly router: Router
    ) { }
}
