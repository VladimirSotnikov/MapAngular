import { Action, createReducer, on } from '@ngrx/store';
import { loadPlacesSuccess, addPlaceSuccess, updatePlaceSuccess, deletePlaceSuccess, selectPlace, unselectPlace } from './place.actions';
import { IPlaceState } from '../index';

export const initialState: IPlaceState = {
    ids: [],
    places: {},
    selected: null
};

const placeReducer = createReducer(
    initialState,
    on(loadPlacesSuccess, (state, { places }) => {
        const newState: IPlaceState = {
            ...state,
            ids: [],
            places: {},
        }
        for (const place of places) {
            newState.places[place.id] = place;
            newState.ids.push(place.id);
        }
        return newState;
    }),
    on(addPlaceSuccess, (state, { place }) => {
        const newState: IPlaceState = {
            ...state,
            ids: [...state.ids, place.id],
            places: { ...state.places }
        }
        newState.places[place.id] = place;
        return newState;
    }),
    on(updatePlaceSuccess, (state, { place }) => {
        const newState: IPlaceState = {
            ...state,
            ids: [...state.ids],
            places: { ...state.places }
        }
        newState.places[place.id] = place;
        return newState;
    }),
    on(deletePlaceSuccess, (state, { place }) => {
        const newState: IPlaceState = {
            ...state,
            ids: [...state.ids],
            places: { ...state.places }
        }
        delete newState.places[place.id];
        newState.ids.splice(state.ids.findIndex(e => e === place.id), 1);
        return newState;
    }),
    on(selectPlace, (state, { id }) => {
        return {
            ids: [...state.ids],
            places: { ...state.places },
            selected: id
        };
    }),
    on(unselectPlace, (state) => {
        return {
            ids: [...state.ids],
            places: { ...state.places },
            selected: null
        };
    })
);

export function reducer(state: IPlaceState, action: Action) {
    return placeReducer(state, action);
}
