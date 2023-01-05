import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RatingHighlightPipe } from './rating-highlight.pipe';
import { RatingData } from './rating-data.model';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RatingHighlightPipe
  ],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RatingComponent,
    multi: true
  }]
})
export class RatingComponent implements OnInit, ControlValueAccessor {

  private readonly defaultRatingsAmount = 5;

  @Input() ratingsAmount = this.defaultRatingsAmount;
  @Input() neutralRatingIcon = 'star_border';
  @Input() highlightedRatingIcon = 'star';

  value: number | null = 0;
  ratings: number[] = [];
  disabled = false;

  onChange: ((rating: number | null) => void) | undefined;
  onTouched: (() => void) | undefined;

  ratingData: RatingData = {
    hoveredRating: null,
    selectedRating: this.value
  }

  ngOnInit() {
    for (let i = 0; i < this.ratingsAmount + 1; i++) {
      this.ratings.push(i);
    }
  }

  mouseOver(rating: number | null) {
    this.updateRatingData(rating);
  }

  mouseOut() {
    this.updateRatingData(null);
  }

  writeValue(value: number): void {
    if (this.disabled) {
      return;
    }

    if (value > this.ratingsAmount) {
      this.value = this.defaultRatingsAmount;
    } else {
      this.value = value > 0 ? value : null;
    }

    this.updateRatingData(null);

    if (this.onChange && this.onTouched) {
      this.onChange(this.value);
      this.onTouched();
    }
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private updateRatingData(hoveredRating: number | null) {
    this.ratingData = {
      hoveredRating: hoveredRating,
      selectedRating: this.value,
      neutralRatingIcon: this.neutralRatingIcon,
      highlightedRatingIcon: this.highlightedRatingIcon
    };
  }
}
