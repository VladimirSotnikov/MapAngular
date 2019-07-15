import { createAction, props } from '@ngrx/store';
import { PlaceDto } from '../../api/place-dto';

export const loadPlaces = createAction(
    '[Places Component] Load Places'
);

export const loadPlacesSuccess = createAction(
    '[Place API] Load Places Success',
    props<{ places: PlaceDto[] }>(),
);

export const loadPlacesError = createAction(
    '[Place API] Load Places Error',
    props<{ error?: any }>(),
);

export const addPlace = createAction(
    '[Places Component] Add Place',
    props<{ place: PlaceDto }>(),
);

export const addPlaceSuccess = createAction(
    '[Place API] Add Place Success',
    props<{ place: PlaceDto }>(),
);

export const addPlaceError = createAction(
    '[Place API] Add Place Error',
    props<{ error?: any }>(),
);

export const updatePlace = createAction(
    '[Places Component] Update Place',
    props<{ place: PlaceDto }>(),
);

export const updatePlaceSuccess = createAction(
    '[Place API] Update Place Success',
    props<{ place: PlaceDto }>(),
);

export const updatePlaceError = createAction(
    '[Place API] Update Place Error',
    props<{ error?: any }>(),
);

export const deletePlace = createAction(
    '[Places Component] Delete Place',
    props<{ place: PlaceDto }>(),
);

export const deletePlaceSuccess = createAction(
    '[Place API] Delete Place Success',
    props<{ place: PlaceDto }>(),
);

export const deletePlaceError = createAction(
    '[Place API] Delete Place Error',
    props<{ error?: any }>(),
);

export const selectPlace = createAction(
    '[Places Component] Select Place',
    props<{ id: number }>(),
);

export const unselectPlace = createAction(
    '[Places Component] Unselect Place',
);
