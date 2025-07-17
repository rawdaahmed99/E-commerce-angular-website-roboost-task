import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialproductsComponent } from './specialproducts.component';

describe('SpecialproductsComponent', () => {
  let component: SpecialproductsComponent;
  let fixture: ComponentFixture<SpecialproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
