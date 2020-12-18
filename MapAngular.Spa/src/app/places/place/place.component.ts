import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { PlaceDto } from '../../api/place-dto';
import { IAppState } from '../../store/index';
import { getSelectedPlace } from '../../store/place/place.selectors';
import { updatePlace, addPlace } from '../../store/place/place.actions';

@Component({
  selector: 'place',
  templateUrl: './place.template.html'
})
export class PlaceComponent {

  place: PlaceDto;
  form: FormGroup;

  latitudeMaskOptions = {
    mask: Number,
    scale: 7,
    max: 90,
    min: -90,
    signed: true,
    radix: '.',
  };

  longitudeMaskOptions = {
    mask: Number,
    scale: 7,
    max: 180,
    min: -180,
    signed: true,
    radix: '.',
  };

  constructor(
    fb: FormBuilder,
    private readonly store: Store<IAppState>
  ) {
    this.form = fb.group({
      id: [0],
      name: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
    });

    this.store.pipe(select(getSelectedPlace)).subscribe((place: PlaceDto) => {
      this.place = place;

      this.form.reset();
      if (place) {
        this.form.patchValue(this.place);
      }
    });
  }

  submit({ value, valid }: { value: PlaceDto, valid: boolean }): void {
    if (!valid) return;

    this.store.dispatch(value.id ? updatePlace({ place: value }) : addPlace({ place: value }));
  }
}
