import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AuthenticationSelector from './authentication.selectors';
import * as AuthenticationActions from './authentication.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationFacade {
  doLogin(email: string, password: string) {
    this.store.dispatch(AuthenticationActions.DoLogin({ email, password }));
  }

  navigateToDashboard() {
    this.store.dispatch(AuthenticationActions.NavigateToDashboardPage());
  }

  navigateTosignIn() {
    this.store.dispatch(AuthenticationActions.NavigateToSignInPage());
  }
  constructor(public store: Store) {}
}
