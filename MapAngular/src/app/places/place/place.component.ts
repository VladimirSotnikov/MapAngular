import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { PlaceDto } from '../../api/place-dto';
import { IAppState } from '../../store/index';
//import { selectPlace, getCount } from '../../store/place/place.selectors';
import { map } from 'rxjs/operators';
import { updatePlace, addPlace } from '../../store/place/place.actions';

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
        private readonly store: Store<IAppState>) {

        const id = parseInt(route.snapshot.params['id'], 10);

        this.form = fb.group({
            id: [0],
            name: ['', Validators.required],
            latitude: [0, Validators.required],
            longitude: [0, Validators.required],
        });

        if (id) {
            //this.store.pipe(select(selectPlace, { id })).subscribe(place => {
            //    this.place = place;
            //    this.form.patchValue(this.place);
            //});
            //this.store.pipe(select(getCount, { id })).subscribe(data => {
            //    console.log('data' + JSON.stringify(data));
            //});
        }
    }

    submit({ value, valid }: { value: PlaceDto, valid: boolean }): void {
        if (!valid) return;

        this.store.dispatch(value.id ? updatePlace({ place: value }) : addPlace({place: value}));

        //this.router.navigate(['/']);
    }
}
