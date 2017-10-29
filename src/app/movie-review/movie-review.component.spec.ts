import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieReviewComponent } from './movie-review.component';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';

describe('MovieReviewComponent', () => {
  let component: MovieReviewComponent;
  let fixture: ComponentFixture<MovieReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieReviewComponent ], imports : [ RouterTestingModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a h2 tag', async(() => {
    const fixture = TestBed.createComponent(MovieReviewComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Movie Review for The Snowman');
  }));

  it('should render a p tag', async(() => {
    const fixture = TestBed.createComponent(MovieReviewComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('When an elite crime squad\'s lead detective (Michael Fassbender) investigates the disappearance of a victim on the first snow of winter, he fears an elusive serial killer may be active again. With the help of a brilliant recruit (Rebecca Ferguson), the cop must connect decades-old cold cases to the brutal new one if he hopes to outwit this unthinkable evil before the next snowfall.');
  }));  
});
