import { MockBackend, MockConnection } from '@angular/http/testing';
import { RecommendedComponent } from './../recommended/recommended.component';
import { MovieswatchedComponent } from './../movieswatched/movieswatched.component';

import { ProfileComponent } from './profile.component';
import { UserService } from '../user.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
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
describe('ProfileComponent', () => {
  /** instance of ProfileComponent*/
  let component: ProfileComponent;
  /** instance of ComponentFixture<ProfileComponent>*/
  let fixture: ComponentFixture<ProfileComponent>;
  /** instance of MockBacken*/
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
        SearchResultsComponent,
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
        MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule,
         MatCardModule],
         providers: [MockBackend,
          BaseRequestOptions,UserService,{provide: APP_BASE_HREF, useValue: '/profile'},
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
    fixture = TestBed.createComponent(ProfileComponent);
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
/** should render title in a h4 tag*/
  it('should render title in a h4 tag', async(() => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('RECOMMENDED MOVIES FOR ');
  }));
/** should use the user name from the service*/
  it('should use the user name from the service', () => {
    let fixture = TestBed.createComponent(ProfileComponent);
    let instance1 = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.username).toEqual(instance1.name);
  });
/**Mock response from backend of the recommended movies to the user */
  it('Mock response from backend of the recommended movies to the user', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
                /**The JSON is converted to string to send to the frontend as a response */
        body: JSON.stringify({ 'r1': 'Spidy',
                               'r2':'WonderWoman' })
      });
      connection.mockRespond(new Response(options));
    });

    component.name='Matt';
    component.ngOnInit();
    expect(component.r1).toEqual('Spidy');
    expect(component.r2).toEqual('WonderWoman');

       });
/**Mock response from backend of the recommended movies to the user if nothing is recommended */
       it('Mock response from backend of the recommended movies to the user if nothing is recommended', () => {
        backend.connections.subscribe((connection: MockConnection) => {
          let options = new ResponseOptions({
                    /**The JSON is converted to string to send to the frontend as a response */
          body: JSON.stringify({  })
          });
          connection.mockRespond(new Response(options));
        });
        component.name='Matt';
        component.ngOnInit();
        expect(component.r1).toEqual(undefined);
           });
/** Mock response from backend of the top rated movies to the user*/
       it('Mock response from backend of the top rated movies to the user', () => {
        backend.connections.subscribe((connection: MockConnection) => {
          let options = new ResponseOptions({    
                /**The JSON is converted to string to send to the frontend as a response */ 
            body: JSON.stringify({ 'm1': 'Gators',
                                   'm2':'WonderWoman' })
          });
          connection.mockRespond(new Response(options));
        });

        component.ngOnInit();
        expect(component.m1).toEqual('Gators');
        expect(component.m2).toEqual('WonderWoman');
           });
/**Mock response from backend of the top rated movies to the user if no top rated movies exist */
           it('Mock response from backend of the top rated movies to the user if no top rated movies exist', () => {
            backend.connections.subscribe((connection: MockConnection) => {
              let options = new ResponseOptions({
                        /**The JSON is converted to string to send to the frontend as a response */
                body: JSON.stringify({  })
              });
              connection.mockRespond(new Response(options));
            });

            component.name='Matt';
            component.ngOnInit();
            expect(component.m1).toEqual(undefined);

               });

});
