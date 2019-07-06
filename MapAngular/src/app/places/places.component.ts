import { Component } from '@angular/core';
import { PlaceDto } from '../api/place-dto';
import { PlacesService } from '../api/places.service';

@Component({
    selector: 'places',
    templateUrl: './places.template.html'
})
export class PlacesComponent {

    places: PlaceDto[] = [];

    constructor(private readonly placeService: PlacesService) {
        this.loadPlaces();
    }

    private async loadPlaces(): Promise<void> {
        this.places = await this.placeService.getPlaces().toPromise();
    }

    async deletePlace(place: PlaceDto): Promise<void> {
        await this.placeService.deletePlace(place.id).toPromise();
        const index = this.places.indexOf(place);
        if (index >= 0) {
            this.places.splice(index);
        }
    }
}
