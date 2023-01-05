import { Pipe, PipeTransform } from '@angular/core';
import { RatingData } from './rating-data.model';

@Pipe({
  name: 'ratingHighlight',
  standalone: true
})
export class RatingHighlightPipe implements PipeTransform {

  transform(currentRating: number, ratingData: RatingData): string {
    const neutralRatingIcon = ratingData.neutralRatingIcon || 'star_border';
    const highlightedRatingIcon = ratingData.highlightedRatingIcon || 'star';

    return this.ratingIsHighlighted(currentRating, ratingData) ? highlightedRatingIcon : neutralRatingIcon;
  }

  private ratingIsHighlighted(currentRating: number, ratingData: RatingData) {
    if (ratingData.hoveredRating !== null) {
      return currentRating <= ratingData.hoveredRating;
    }

    if (ratingData.selectedRating !== null) {
      return currentRating <= ratingData.selectedRating;
    }

    return false;
  }
}
