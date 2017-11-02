import { Routes } from '@angular/router';

// import all the components that are to be routed here
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
  }
];
