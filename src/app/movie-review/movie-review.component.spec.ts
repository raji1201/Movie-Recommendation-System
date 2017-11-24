import { RecommendedComponent } from './../recommended/recommended.component';
import { MovieswatchedComponent } from './../movieswatched/movieswatched.component';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed,inject, fakeAsync,tick } from '@angular/core/testing';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NavComponent } from '../nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule }    from '@angular/http';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { MovieReviewComponent } from '../movie-review/movie-review.component';
import { TrmComponent } from '../trm/trm.component';
import { ElasticsearchService } from '../elasticsearch.service';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


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
//test
describe('MovieReviewComponent', () => {
  let component: MovieReviewComponent;
  let fixture: ComponentFixture<MovieReviewComponent>;
  let subject: UserService = null;
  let backend: MockBackend = null;
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
        RecommendedComponent ], 
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
         providers: [MovieReviewComponent,MockBackend,UserService,{provide: APP_BASE_HREF, useValue: 'reviews/:'}, ElasticsearchService]
         
    })
    .compileComponents();
  }));

  beforeEach(inject([UserService, MockBackend], (userService: UserService, mockBackend: MockBackend) => {
    subject = userService;
    backend = mockBackend;
    fixture = TestBed.createComponent(MovieReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});