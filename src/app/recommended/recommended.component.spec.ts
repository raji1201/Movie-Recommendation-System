import { ElasticsearchService } from './../elasticsearch.service';
import { UserService } from './../user.service';
import { MatMenuModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedComponent } from './recommended.component';
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
  let component: RecommendedComponent;
  let fixture: ComponentFixture<RecommendedComponent>;

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
         providers: [UserService,{provide: APP_BASE_HREF, useValue: '/recommended'}, ElasticsearchService]
         
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the method getCurrUser() from UserService on object initialisation',()=>{
    let userService: UserService;
    userService=TestBed.get(UserService);
    userService.username='Matt';
    spyOn(userService, 'getCurrUser');
    component.ngOnInit();
    expect(userService.getCurrUser).toHaveBeenCalled();
  });
  it('should mock the correct username from UserService on object initialisation',()=>{
    let userService: UserService;
  
    userService=TestBed.get(UserService);
    userService.username='Matt';
    const name=userService.getCurrUser();
    spyOn(userService, 'getCurrUser');
    component.ngOnInit();
    expect(name).toBe('Matt');
  });
});
