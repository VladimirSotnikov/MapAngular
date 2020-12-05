import { createSelector } from '@ngrx/store';
import { IAppState } from '../';

const getPlaceMap = (state: IAppState) => state.places.places;

const getPlaceIds = (state: IAppState) => state.places.ids;

export const getSelectedPlaceId = (state: IAppState) => state.places.selected;

export const getPlaces = createSelector(
  getPlaceMap,
  getPlaceIds,
  (placeMap, ids) => ids.map(id => placeMap[id])
);

export const getSelectedPlace = createSelector(
  getPlaceMap,
  getSelectedPlaceId,
  (placeMap, id) => placeMap[id]
);
