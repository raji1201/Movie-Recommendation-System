import { RecommendedComponent } from './../recommended/recommended.component';
import { MovieswatchedComponent } from './../movieswatched/movieswatched.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AppComponent } from '../app.component';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NavComponent } from '../nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { MovieReviewComponent } from '../movie-review/movie-review.component';
import { TrmComponent } from '../trm/trm.component';
import { ElasticsearchService } from '../elasticsearch.service';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { ReactiveFormsModule } from '@angular/forms';
/**
 * declares all the routes in the application which the AppModule uses
 */
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
describe('SearchResultsComponent', () => {
  /** instance of SearchResultsComponent*/
  let component: SearchResultsComponent;
  /** instance of ComponentFixture*/
  let fixture: ComponentFixture<SearchResultsComponent>;
/**
   * provides,imports and declares the module for the testing framework for this component
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,
        NavComponent,
        LoginComponent,
        SignUpComponent,
        HomeComponent,
        ProfileComponent,
        MovieReviewComponent,
        TrmComponent,
        SearchResultsComponent ,
        MovieswatchedComponent ,
        RecommendedComponent  ], 
        imports : [ HttpModule,
          HttpClientModule,
          FormsModule,
          BrowserModule,
          ReactiveFormsModule,
          RouterModule,
          RouterModule.forRoot(
            appRoutes,
            { enableTracing: true }
        ),        BrowserAnimationsModule, BrowserModule, MatButtonModule, 
        MatCheckboxModule,MatMenuModule, MatToolbarModule, MatIconModule,
         MatCardModule],
         providers: [UserService,{provide: APP_BASE_HREF, useValue: 'results'}, ElasticsearchService]
         
    })
    .compileComponents();
  }));
/**
 * create a new instance of component before each assertion test
 * 
 */
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    /** Trigger a change detection cycle for the component.*/
    fixture.detectChanges();
  });
/**
 * assert that component should be created successfully
 */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
/** should have no movies when initialised*/
  it('should have no movies when initialised', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    component.movies=[];
    const compiled = fixture.debugElement.nativeElement;
    expect(component.movies.length===0).toBe(true);
  }));
/**when movie exists, should assert correctly */
  it('when movie exists, should assert correctly ', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    component.movies=['Batman'];
    const compiled = fixture.debugElement.nativeElement;
    expect(component.movies.length === 0).toBe(false);
  }));
  /**when no movie exists,should have No results! stored in it */
  it('when no movie exists,should have No results! stored in it ', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(component.movies[0]).toBe('No results!');
  }));
});

