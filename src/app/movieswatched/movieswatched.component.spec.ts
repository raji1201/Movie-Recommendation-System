import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieswatchedComponent } from './movieswatched.component';

describe('MovieswatchedComponent', () => {
  let component: MovieswatchedComponent;
  let fixture: ComponentFixture<MovieswatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieswatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieswatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
