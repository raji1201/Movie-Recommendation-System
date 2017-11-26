import { RecommendedComponent } from './../recommended/recommended.component';
import { MovieswatchedComponent } from './../movieswatched/movieswatched.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
describe('NavComponent', () => {
  /** instance of NavComponent*/
  let component: NavComponent;
  /** instance of ComponentFixture<NavComponent>*/
  let fixture: ComponentFixture<NavComponent>;
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
      providers: [UserService,{provide: APP_BASE_HREF, useValue: '/'}, ElasticsearchService]
      })
    .compileComponents();
  }));
/**
 * create a new instance of component before each assertion 
 * test.
 */
  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
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
/** should render a mat-menu tag*/
  it('should render a mat-menu tag', async(() => {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-menu').textContent).length==2;
  }));
/** should render a <a> heading tag to contain MOVIE RECOMMENDATION ENGINE*/
  it('should render a <a> heading tag', async(() => {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('  MOVIE RECOMMENDATION ENGINE ');
  }));


});
