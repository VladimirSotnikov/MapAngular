import { PlaceDto } from '../api/place-dto';
import { RouterReducerState } from '@ngrx/router-store';

export interface IPlaceState {
  ids: number[];
  places: { [id: number]: PlaceDto };
  selected: number;
}

export interface IAppState {
  places: IPlaceState,
  router: RouterReducerState<any>;
}

export * from './place/place.selectors';
