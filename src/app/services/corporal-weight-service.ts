import { inject, Injectable, signal } from '@angular/core';
import { RequestService } from './request';
import { CorporalWeight } from '@app/models/corporal-weight.model';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { LOADING_KEYS } from '@app/constants/loading';
import { LoadingService } from './loading-service';
import { NotificationService } from './notification';

@Injectable({
  providedIn: 'root',
})
export class CorporalWeightService extends RequestService {
  /*  Injections */
  private readonly _notificationService = inject(NotificationService);
  private readonly _loadingService = inject(LoadingService);

  /*  Signals */
  private _corporalWeights = signal<CorporalWeight[]>([]);
  corporalWeights = this._corporalWeights.asReadonly();

  /*  Variables */
  private readonly _url = '/corporal-weight';

  getAllCorporalWeight(): Observable<CorporalWeight[]> {
    this._loadingService.setLoading(LOADING_KEYS.get_all_corporal_weight, true);
    return this.getAll<CorporalWeight>(this._url).pipe(
      tap((res) => this._corporalWeights.set(res)),
      catchError((err) => {
        this._notificationService.createError('No se pudieron obtener los pesos corporales')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.get_all_corporal_weight))
    );
  }
  
  addCorporalWeight(corporalWeight: CorporalWeight): Observable<CorporalWeight> {
    this._loadingService.setLoading(LOADING_KEYS.save_corporal_weight, true);
    return this.create<CorporalWeight>(this._url, corporalWeight).pipe(
      tap(() => this._notificationService.createSuccess('¡Peso corporal agregado!')),
      catchError((err) => {
        this._notificationService.createError('No se pudo agregar el peso corporal')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.save_corporal_weight))
    );
  }
}
