import { ElasticsearchService } from './../elasticsearch.service';
import { UserService } from './../user.service';
import { MockBackend , MockConnection} from '@angular/http/testing';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './../app.component';
import { NavComponent } from './../nav/nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RecommendedComponent } from './../recommended/recommended.component';
import { TrmComponent } from './../trm/trm.component';
import { SearchResultsComponent } from './../search-results/search-results.component';
import { MovieReviewComponent } from './../movie-review/movie-review.component';
import { HomeComponent } from './../home/home.component';
import { ProfileComponent } from './../profile/profile.component';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { LoginComponent } from './../login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MovieswatchedComponent } from './movieswatched.component';

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
describe('MovieswatchedComponent', () => {
  /** instance of MovieswatchedComponent*/
  let component: MovieswatchedComponent;
  /** instance of ComponentFixture<MovieswatchedComponent>*/
  let fixture: ComponentFixture<MovieswatchedComponent>;
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
        RecommendedComponent
       ], 
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
         providers: [ MockBackend,
          BaseRequestOptions,UserService,
          {provide: APP_BASE_HREF, useValue: '/movieswatched'}, ElasticsearchService,
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
    fixture = TestBed.createComponent(MovieswatchedComponent);
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
/** Mock response of the movies watched by the user*/
  it('Mock response of the movies watched by the user', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        /**JSON converted to string and sent as a response to frontend */
        body: JSON.stringify({ 'movies': ['Spiderman', 'Batman' ]})
      });
      connection.mockRespond(new Response(options));
    });

    component.name='Matt';
    component.ngOnInit();
    expect(component.movies[0]).toEqual('Spiderman');
       });
/**Mock response of the movies watched by the user should be No results! if no movies is watched by the user */
       it('Mock response of the movies watched by the user should be No results! if no movies is watched by the user', () => {
        backend.connections.subscribe((connection: MockConnection) => {
          let options = new ResponseOptions({
             /**JSON converted to string and sent as a response to frontend */
            body: JSON.stringify({ 'movies': []})
          });
          connection.mockRespond(new Response(options));
        });
    
        component.name='Matt';
        component.ngOnInit();
        expect(component.movies[0]).toEqual('No results!');
           });
  
});
