import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule }    from '@angular/http';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './user.service';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { TrmComponent } from './trm/trm.component';
import { ElasticsearchService } from './elasticsearch.service';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MovieswatchedComponent } from './movieswatched/movieswatched.component';
import { RecommendedComponent } from './recommended/recommended.component';

/** This provides the route for the individual components */
const appRoutes: Routes = [
	{path: 'login', component: LoginComponent },
	{path: 'signup', component: SignUpComponent},
	{path: '', component: HomeComponent},
  {path: 'profile/:name', component: ProfileComponent},
  {path: 'reviews/:name', component: MovieReviewComponent},
  {path: 'trm', component: TrmComponent},
  {path: 'results', component: SearchResultsComponent},
  {path: 'movieswatched', component: MovieswatchedComponent},
  {path: 'recommended', component: RecommendedComponent}
];

/** The NgModule directive has the individual components imported into the application
 * along with their declarations. It also has the component whch bootstraps the application
 * and individual services the application uses.
 */
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    MovieReviewComponent,
    TrmComponent,
    SearchResultsComponent,
    MovieswatchedComponent,
    RecommendedComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      ),
    BrowserAnimationsModule, BrowserModule, MatButtonModule, MatCheckboxModule,MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule
  ],
  providers: [UserService, ElasticsearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }