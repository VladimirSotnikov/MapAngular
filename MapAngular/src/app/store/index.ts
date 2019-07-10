import { PlaceDto } from '../api/place-dto';

export interface IPlaceState {
    ids: number[];
    places: { [id: number]: PlaceDto };
    selected: number;
}

export interface IAppState {
    places: IPlaceState
}

export * from './place/place.selectors';
