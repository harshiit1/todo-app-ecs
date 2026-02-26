import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthenticationActions from './authentication.actions';
import { filter, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { UserModel } from '../../shared/models/user/user-model';

@Injectable()
export class AuthenticationEffects {
  DoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.DoLogin),
      filter((action) => !!action.email && !!action.password),
      mergeMap((action) => {
        const payload: UserModel = {
          Email: action.email ?? '',
          Password: action.password ?? '',
        };
        return this.authenticationService.login(payload).pipe();
      }),
    ),
  );

  NavigateToSignInPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthenticationActions.NavigateToSignInPage),
        tap(() => {
          return this.router.navigate(['/authentication/sign-in']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    public router: Router,
    public authenticationService: AuthService,
  ) {}
}
