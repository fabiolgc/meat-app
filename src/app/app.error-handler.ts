import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'


import { NotificationsService } from './shared/messages/notification.service';
import { AuthService } from './login/auth.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationsService,
              private injector: Injector,
              private zone: NgZone) {
    super()
    console.log('error: constructor')
  }

  handleError(errorResponse: HttpErrorResponse | any) {

    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.statusText ? errorResponse.message : errorResponse.toString();

      this.zone.run(() => {
        console.log('>>>' + errorResponse)

        switch (errorResponse.status) {
          case 0:
            this.ns.notify(message || 'Erro. Verifique o console para mais detalhes.')
          break;
          case 400:
            this.ns.notify('Não autorizado. Usuário e senha não conferem.')
          break;

          case 401:
            this.injector.get(AuthService).handleLogin()
          break;

          case 403:
            this.ns.notify(message || 'Não autorizado')
          break;

          case 404:
            this.ns.notify(message || 'Recurso não encontrado')
          break;
        }
      })

    }
    super.handleError(errorResponse)
        // throw errorResponse;
  }

}
