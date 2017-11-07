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
  {path: 'results', component: SearchResultsComponent}
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
        SearchResultsComponent  ], 
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
         providers: [MockBackend,UserService,{provide: APP_BASE_HREF, useValue: 'reviews/:'}, ElasticsearchService]
         
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

//   it('error while server is down', fakeAsync(() => {
//     const status= '';
//     //let catchedError: any;
//     this.lastConnection.mockRespond(new Response(new ResponseOptions({
//       status: 404,
//       statusText: 'URL not Found',
//     })));
//     tick();
//    // expect(status).toBe(404);
// //    expect(catchedError).toBeDefined();
//   }));

    

  // it('should render a h2 tag', inject([UserService, MockBackend], (userService: UserService, mockBackend: MockBackend) => {
  //   subject = userService;
  //   backend = mockBackend;

  //   it('#login should call endpoint and return it\'s result', (done) => {
  //     backend.connections.subscribe((connection: MockConnection) => {
  //       let options = new ResponseOptions({
  //         body: JSON.stringify({ success: true })
  //       });
  //       connection.mockRespond(new Response(options));
  //     });
  
  //     subject
  //       .login({ username: 'admin', password: 'secret' })
  //       .subscribe((response) => {
  //         expect(response.json()).toEqual({ success: true });
  //         done();
  //       });
  //   });
  // }));


  //   const fixture = TestBed.createComponent(MovieReviewComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h2').textContent).toContain('Movie Review for ');
  // }));



//   it('should render a p tag in the description', async(() => {
//     const fixture = TestBed.createComponent(MovieReviewComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     //let result = fixture.nativeElement.querySelector('');
//     expect(compiled.querySelector('p').textContent).toContain('Movie description : ');
//   }));  

//   it('should render a star', async(() => {
//     const fixture = TestBed.createComponent(MovieReviewComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('input'));
//   }));  
// });
});