import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RatingComponent} from "./rating/rating.component";
import {JsonPipe} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";

interface RatingForm {
  name: FormControl<string | null>;
  rating: FormControl<number | null>
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RatingComponent,
    JsonPipe,
    MatDividerModule
  ]
})
export class AppComponent {
  title = 'ratings-form';

  form: FormGroup<RatingForm>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: this.fb.control<string | null>(null, Validators.required),
      rating: this.fb.control<number | null>({value: null, disabled: false}, Validators.required)
    });
  }
}
