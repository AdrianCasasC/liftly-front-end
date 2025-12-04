import { Component, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { CorporalWeightService } from '@app/services/corporal-weight-service';
import { CorporalWeight } from '@app/models/corporal-weight.model';


@Component({
  selector: 'liftly-weight-tracker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weight-tracker.html',
  styleUrls: ['./weight-tracker.scss'],
})
export class WeighTracker {
  /* Injections */
  private readonly _corporalWeightService = inject(CorporalWeightService);

  /* Signals */
  corporalWeights = this._corporalWeightService.corporalWeights;
  weight = signal<number | null>(null);


  // CHART INSTANCE
  private chart?: Chart;

  constructor() {
    effect(() => {
      if (this.corporalWeights().length > 0) {
        this.updateChart();
      }
    });
  }

  submitWeigh() {
    if (!this.weight()) return;

    const newCorporalWeight: CorporalWeight = {
      weight: this.weight()!,
      date: new Date().toISOString(),
    };

    this._corporalWeightService.addCorporalWeight(newCorporalWeight).subscribe({
      next: () => {
        this._corporalWeightService.getAllCorporalWeight();
        this.weight.set(null);
      },
      error: (e) => console.error('Error saving weight:', e),
    });
  }

  updateChart() {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    if (!ctx) return;

    const labels = this.corporalWeights().map(w => new Date(w.date).toLocaleDateString());
    const data = this.corporalWeights().map(w => w.weight);

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Weight Progress',
            data,
            borderColor: 'orange',
            backgroundColor: 'black',
            tension: 0.3,
            pointRadius: 5,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: 'black' } },
          y: { ticks: { color: 'black' } },
        },
        plugins: {
          legend: {
            labels: { color: 'black' },
          },
        },
      },
    });
  }
}
