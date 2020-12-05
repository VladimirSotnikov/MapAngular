import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaceDto } from './place-dto';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private readonly http: HttpClient) { }

  getPlaces(): Observable<PlaceDto[]> {
    return this.http.get('/api/places/getPlaces')
      .pipe(map(data => data as PlaceDto[]));
  }

  getPlace(id: number): Observable<PlaceDto> {
    return this.http.get(`/api/places/getPlace/${id}`)
      .pipe(map(data => data as PlaceDto));
  }

  addPlace(place: PlaceDto): Observable<PlaceDto> {
    return this.http.post(`/api/places/addPlace`, place)
      .pipe(map(data => data as PlaceDto));
  }

  updatePlace(place: PlaceDto): Observable<PlaceDto> {
    return this.http.put(`/api/places/updatePlace`, place)
      .pipe(map(data => data as PlaceDto));
  }

  deletePlace(id: number): Observable<void> {
    return this.http.delete(`/api/places/deletePlace/${id}`)
      .pipe(map(data => data as any as void));
  }
}
