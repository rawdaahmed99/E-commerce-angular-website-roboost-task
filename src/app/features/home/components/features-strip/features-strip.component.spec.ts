import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesStripComponent } from './features-strip.component';

describe('FeaturesStripComponent', () => {
  let component: FeaturesStripComponent;
  let fixture: ComponentFixture<FeaturesStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesStripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
