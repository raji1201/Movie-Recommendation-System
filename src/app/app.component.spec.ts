import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule }    from '@angular/http';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';

const appRoutes: Routes = [
	{path: 'login', component: LoginComponent },
	{path: 'signup', component: SignUpComponent},
	{path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent}
]

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
	    NavComponent,
	    LoginComponent,
	    SignUpComponent,
	    HomeComponent,
	    ProfileComponent
      ],
      imports: [HttpModule,
  		HttpClientModule,
  		FormsModule,
  		RouterModule.forRoot(
      		appRoutes,
      		{ enableTracing: true }
    	),
    	BrowserAnimationsModule, BrowserModule, MatButtonModule, MatCheckboxModule,MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule],
	  providers: [UserService,{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Movie Recommendation Engine'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Movie Recommendation Engine');
  }));
});
