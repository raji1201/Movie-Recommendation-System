import { MockBackend, MockConnection } from '@angular/http/testing';
import { MovieswatchedComponent } from './../movieswatched/movieswatched.component';
import { RecommendedComponent } from './../recommended/recommended.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TrmComponent } from './trm.component';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { Http, HttpModule,Response, BaseRequestOptions, ResponseOptions } from '@angular/http';
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

describe('TrmComponent', () => {
    /** instance of TrmComponent*/
  let component: TrmComponent;
  /** instance of ComponentFixture*/
  let fixture: ComponentFixture<TrmComponent>;
  /** instance of MockBackend*/
  let backend: MockBackend = null;
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
         providers: [MockBackend,
          BaseRequestOptions,UserService, {provide: APP_BASE_HREF, useValue: '/seemore'},
          ElasticsearchService,
          {provide: Http, useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]}
        ]
         
    })
    .compileComponents();
  }));
/**
 * create a new instance of component before each assertion 
 * test and injects Userservice and MockBackend into it.
 */
  beforeEach(inject([UserService, MockBackend], (userService: UserService, mockBackend: MockBackend) => {
    fixture = TestBed.createComponent(TrmComponent);
    backend = mockBackend;
    component = fixture.componentInstance;
    /** Trigger a change detection cycle for the component.*/
    fixture.detectChanges();
    
  }));
/**
 * assert that component should be created successfully
 */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
/** should render a <h2> heading tag*/
  it('should render a <h2> heading tag', async(() => {
    const fixture = TestBed.createComponent(TrmComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('TOP RATED MOVIES');
  }));

  /**Mock response of movies got when user clicks (seemore) */
  it('Mock response of movies got when user clicks (seemore) ', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        /**The JSON is converted to string to send to the frontend as a response */
        body: JSON.stringify({ 'movie': ['Spiderman', 'Batman' ]})
      });
      connection.mockRespond(new Response(options));
    });
    component.ngOnInit();
    expect(component.movies[0]).toEqual('Spiderman');
    expect(component.movies[1]).toEqual('Batman');
       });

});
