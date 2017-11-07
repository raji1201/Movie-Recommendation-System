
import { ProfileComponent } from './profile.component';
import { UserService } from '../user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { HttpModule } from '@angular/http';
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



const appRoutes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignUpComponent},
  {path: '', component: HomeComponent},
  {path: 'profile/:name', component: ProfileComponent},
  {path: 'reviews/:name', component: MovieReviewComponent},
  {path: 'trm', component: TrmComponent},
  {path: 'results', component: SearchResultsComponent}
];
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

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
         providers: [UserService,{provide: APP_BASE_HREF, useValue: '/profile'}, ElasticsearchService]
         
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h4 tag', async(() => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('RECOMMENDED MOVIES FOR ');
  }));

  it('should render title in a a tag', async(() => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('The Snowman');
  }));

  // ('should display the user name if user is logged in', () => {
  //   let fixture = TestBed.createComponent(ProfileComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h2').textContent).toContain(app.name);
  // });

  it('should use the user name from the service', () => {
    let fixture = TestBed.createComponent(ProfileComponent);
    let instance1 = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.username).toEqual(instance1.name);
  });

});
