import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UrlInterceptor } from './url.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { appRoutes } from './app.routes';
import { LogoutComponent } from './logout/logout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReadingComponent } from './reading/reading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LogoutComponent,
    TopbarComponent,
    PageNotFoundComponent,
    ReadingComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UrlInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
