import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceDto } from '../../api/place-dto';
import { PlacesService } from '../../api/places.service';

@Component({
    selector: 'place',
    templateUrl: './place.template.html'
})
export class PlaceComponent {

    place: PlaceDto;
    form: FormGroup;

    constructor(
        fb: FormBuilder,
        route: ActivatedRoute,
        private readonly router: Router,
        private readonly placeService: PlacesService) {

        const id = route.snapshot.params['id'] as number;

        this.form = fb.group({
            id: [0],
            name: ['', Validators.required],
            latitude: [0, Validators.required],
            longitude: [0, Validators.required],
        });

        if (id) {
            this.loadPlace(id);
        }
    }

    private async loadPlace(id: number): Promise<void> {
        this.place = await this.placeService.getPlace(id).toPromise();

        this.form.patchValue(this.place);
    }

    async submit({ value, valid }: { value: PlaceDto, valid: boolean }): Promise<void> {
        if (!valid) return;

        await (value.id ? this.placeService.updatePlace(value) : this.placeService.addPlace(value)).toPromise();

        this.router.navigate(['/']);
    }
}
