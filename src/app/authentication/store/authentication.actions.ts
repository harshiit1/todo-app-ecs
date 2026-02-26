import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../shared/models/user/user-model';

export const DoLogin = createAction(
  '[Authentication] Login User',
  props<{ email: string; password: string }>(),
);
export const DoLoginSuccess = createAction(
  '[Authentication] Login User Success',
  props<{ user: UserModel }>(),
);
export const DoLoginFailure = createAction(
  '[Authentication] Login User Failure',
  props<{ error: any }>(),
);

export const NavigateToSignInPage = createAction('[Authentication] Navigate To Sign In Page');
export const NavigateToDashboardPage = createAction('[Authentication] Navigate To Dashboard Page');
