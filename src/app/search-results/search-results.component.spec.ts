import { async, ComponentFixture, TestBed } from '@angular/core/testing';


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
describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

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
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no movies when initialised', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    component.movies=[];
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('a').textContent).toContain('Batman');
    expect(component.movies.length===0).toBe(true);
  }));

  it('when movie exists, should assert correctly ', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    component.movies=['Batman'];
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('a').textContent).toContain('Batman');
    expect(component.movies.length===0).toBe(false);
  }));
  it('when no movie exists,should have No results! stored in it ', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    //component.movies=['Batman'];
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('a').textContent).toContain('Batman');
    expect(component.movies[0]).toBe('No results!');
  }));
});

