import { MockBackend, MockConnection } from '@angular/http/testing';
import { ElasticsearchService } from './../elasticsearch.service';
import { UserService } from './../user.service';
import { MatMenuModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './../app.component';
import { NavComponent } from './../nav/nav.component';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { HomeComponent } from './../home/home.component';
import { ProfileComponent } from './../profile/profile.component';
import { MovieswatchedComponent } from './../movieswatched/movieswatched.component';
import { SearchResultsComponent } from './../search-results/search-results.component';
import { TrmComponent } from './../trm/trm.component';
import { MovieReviewComponent } from './../movie-review/movie-review.component';
import { LoginComponent } from './../login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RecommendedComponent } from './recommended.component';
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
describe('RecommendedComponent', () => {
  /** instance of RecommendedComponent*/
  let component: RecommendedComponent;
  /** instance of ComponentFixture*/
  let fixture: ComponentFixture<RecommendedComponent>;
  /** instance of MockBackend*/
  let backend: MockBackend = null;
  /**
   * provides,imports and declares the module for the testing framework for this component
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,
        NavComponent,
        LoginComponent,
        SignUpComponent,
        HomeComponent,
        ProfileComponent,
        MovieReviewComponent,
        TrmComponent,
        SearchResultsComponent,
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
        MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule,
         MatCardModule],
         providers: [MockBackend,
          BaseRequestOptions, UserService,{provide: APP_BASE_HREF, useValue: '/recommended'},
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
    fixture = TestBed.createComponent(RecommendedComponent);
    backend = mockBackend;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
/**
 * assert that component should be created successfully
 */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
/** should call the method getCurrUser() from UserService on object initialisation*/
  it('should call the method getCurrUser() from UserService on object initialisation',()=>{
    let userService: UserService;
    userService=TestBed.get(UserService);
    userService.username='Matt';
    spyOn(userService, 'getCurrUser');
    component.ngOnInit();
    expect(userService.getCurrUser).toHaveBeenCalled();
  });
  /**should mock the correct username from UserService on object initialisation */
  it('should mock the correct username from UserService on object initialisation',()=>{
    let userService: UserService;
  
    userService=TestBed.get(UserService);
    userService.username='Matt';
    const name=userService.getCurrUser();
    spyOn(userService, 'getCurrUser');
    component.ngOnInit();
    expect(name).toBe('Matt');
  });
  /**should mock the correct username from UserService on object initialisation */
  it('Mock response of the movies watched by the user should be No results! if no movies is watched by the user', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
                        /**The JSON is converted to string to send to the frontend as a response */
        body: JSON.stringify({ 'movies': []})
      });
      connection.mockRespond(new Response(options));
    });

    component.name='Matt';
    component.ngOnInit();
    expect(component.movies[0]).toEqual('No results!');
       });

       it('Mock response of the movies recommended to the user', () => {
        backend.connections.subscribe((connection: MockConnection) => {
          let options = new ResponseOptions({
                            /**The JSON is converted to string to send to the frontend as a response */
            body: JSON.stringify({ 'movies': ['Spiderman', 'Batman' ]})
          });
          connection.mockRespond(new Response(options));
        });
    
        component.name='Matt';
        component.ngOnInit();
        expect(component.movies[0]).toEqual('Spiderman');
           });
});
