import { Component } from '@angular/core';
import { WeighTracker } from '@app/components/weight-tracker/weight-tracker';

@Component({
  selector: 'app-weight-page',
  imports: [WeighTracker],
  templateUrl: './weight-page.html',
  styleUrl: './weight-page.scss',
})
export class WeightPage {

}
