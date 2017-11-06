import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './user.service';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { TrmComponent } from './trm/trm.component';
// import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from 'angular-star-rating/src/star-rating-struct';
// import {StarRatingModule} from 'angular-star-rating/src/star-rating-module';

const appRoutes: Routes = [
	{path: 'login', component: LoginComponent },
	{path: 'signup', component: SignUpComponent},
	{path: '', component: HomeComponent},
  {path: 'profile/:name', component: ProfileComponent},
  {path: 'reviews/:name', component: MovieReviewComponent},
  {path: 'trm', component: TrmComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    MovieReviewComponent,
    TrmComponent
  ],
  imports: [
  HttpModule,
  HttpClientModule,
  FormsModule,
//cl  StarRatingModule.forRoot(),
 
  
  RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule, BrowserModule, MatButtonModule, MatCheckboxModule,MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }