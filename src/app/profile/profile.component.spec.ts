import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { UserService } from '../user.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ]
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
    expect(compiled.querySelector('h4').textContent).toContain('RECOMMENDED MOVIES FOR Raji');
  }));

  it('should render title in a a tag', async(() => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('The Snowman');
  }));

  ('should display the user name if user is logged in', () => {
    let fixture = TestBed.createComponent(ProfileComponent);
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(app.name);
  });

  it('should use the user name from the service', () => {
    let fixture = TestBed.createComponent(ProfileComponent);
    let instance1 = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.username).toEqual(instance1.name);
  });

});
