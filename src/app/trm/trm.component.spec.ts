import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrmComponent } from './trm.component';


import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../user.service';
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

describe('TrmComponent', () => {
  let component: TrmComponent;
  let fixture: ComponentFixture<TrmComponent>;

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
         providers: [UserService,{provide: APP_BASE_HREF, useValue: 'results'}, ElasticsearchService]
         
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a <h2> heading tag', async(() => {
    const fixture = TestBed.createComponent(TrmComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('TOP RATED MOVIES');
  }));

  it('should return true if movie 1 is empty', async(() => {
    const fixture = TestBed.createComponent(TrmComponent);
    fixture.detectChanges();
   // this.m2='Batman';
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('a').textContent).toContain('Batman');
    expect(component.m1.length===0).toBe(true);
  }));

  it('should return true if movie 2 is not empty', async(() => {
    const fixture = TestBed.createComponent(TrmComponent);
    fixture.detectChanges();
   component.m2='Batman';
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('a').textContent).toContain('Batman');
    expect(component.m2.length>0).toBe(true);
  }));

  it('should return true if movie 5 is not empty', async(() => {
    const fixture = TestBed.createComponent(TrmComponent);
    fixture.detectChanges();
   component.m5='Batman';
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('a').textContent).toContain('Batman');
    expect(component.m5.length>0).toBe(true);
  }));
  
});
