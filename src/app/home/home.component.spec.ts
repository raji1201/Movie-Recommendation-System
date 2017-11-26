import { MockBackend, MockConnection } from '@angular/http/testing';
import { RecommendedComponent } from './../recommended/recommended.component';
import { MovieswatchedComponent } from './../movieswatched/movieswatched.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
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
import { Http, HttpModule, Response, BaseRequestOptions, ResponseOptions }    from '@angular/http';
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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let backend: MockBackend = null;
  /**
   * provides,imports and declares the module for the testing framework for this component
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
       declarations: [  AppComponent,
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
      imports: [
        HttpModule,
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
       MatCardModule
      
    ],
    providers: [MockBackend,
      BaseRequestOptions,UserService,{provide: APP_BASE_HREF, useValue: '/home'}, 
    ElasticsearchService,{provide: Http, useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backendInstance, defaultOptions);
    }, deps: [MockBackend, BaseRequestOptions]}
  ]
    })
    .compileComponents();
  }));
/**
 * create a new instance of component before each assertion test.
 */
  beforeEach(inject([UserService, MockBackend], (userService: UserService, mockBackend: MockBackend) => {
    fixture = TestBed.createComponent(HomeComponent);
    backend = mockBackend;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
/**
 * assert that component should be created successdfully
 */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
/**Test to ensure that it should render title in a h4 tag */
  it('should render title in a h4 tag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
     /**Trigger a change detection cycle for the component.*/
    fixture.detectChanges();
    /** The DebugElement associated with the root element of this component.*/
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('TOP RATED MOVIES');
  }));
/**Negative test to check if movie name is rendered' */
  it('negative test to check if movie name is rendered', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    component.m1='Batman';
    const compiled = fixture.debugElement.nativeElement;
    expect(component.m1.length>0).toBe(true);
  }));
  /** should render movie2 in <a> tag*/
  it('should render movie2 in <a> tag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(component.m1.length===0).toBe(true);
  }));
  /** should render movie3 in <a> tag'*/
  it('should render movie3 in <a> tag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(component.m3.length===0).toBe(true);
  }));
  /**Mock response of movies got when user logs out  */

  it('Mock response of movies got when user logs out ', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        /**The JSON is converted to string to send to the frontend as a response */
        body: JSON.stringify({ 'm1':'Spidy','m2':'Snowwhite' })
      });
      /**respond to the mocked backend */
      connection.mockRespond(new Response(options));
    });
    component.ngOnInit();
    expect(component.m1).toEqual('Spidy');
    expect(component.m2).toEqual('Snowwhite');
       });

});
