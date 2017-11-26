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
//test
describe('MovieReviewComponent', () => {
  /** instance of MovieReviewComponen*/
  let component: MovieReviewComponent;
  /** instance of ComponentFixture<MovieReviewComponent>*/
  let fixture: ComponentFixture<MovieReviewComponent>;
  /** instance of MockBackend*/
  
  let backend: MockBackend = null;
  /**
   * provides,imports and declares the module for the testing framework for this component
   */
  beforeEach(() => {
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
        imports : [  HttpModule,
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
         providers: [MovieReviewComponent,MockBackend,UserService,BaseRequestOptions,
          {provide: APP_BASE_HREF, useValue: 'reviews/:name'}, ElasticsearchService,
          {provide: Http, useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]}
        ]
    })
    .compileComponents();
  });
/**
 * create a new instance of component before each assertion 
 * test and injects Userservice and MockBackend into it.
 */
  beforeEach(inject([UserService, MockBackend], (userService: UserService, mockBackend: MockBackend) => {
//    subject = userService;
fixture = TestBed.createComponent(MovieReviewComponent);
   backend = mockBackend;
    
    component = fixture.componentInstance;
    /**Trigger a change detection cycle for the component.*/
    fixture.detectChanges();
  }));
 /**
 * assert that component should be created successfully
 */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
/**Mock response of the movies review details to be displayed to the user */
  it('Mock response of the movies review details to be displayed to the user', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        // JSON converted to string and sent as a response to frontend
        body: JSON.stringify({ 'genres': 'Action'})
      });
      connection.mockRespond(new Response(options));
    });

    component.ngOnInit();
    expect(component.genres).toEqual('Action');
       });

});