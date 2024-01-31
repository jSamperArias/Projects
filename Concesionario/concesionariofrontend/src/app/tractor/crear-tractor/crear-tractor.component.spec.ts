import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTractorComponent } from './crear-tractor.component';

describe('CrearTractorComponent', () => {
  let component: CrearTractorComponent;
  let fixture: ComponentFixture<CrearTractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearTractorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearTractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
