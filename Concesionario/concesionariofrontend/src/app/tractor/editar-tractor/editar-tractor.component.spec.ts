import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTractorComponent } from './editar-tractor.component';

describe('EditarTractorComponent', () => {
  let component: EditarTractorComponent;
  let fixture: ComponentFixture<EditarTractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarTractorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarTractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
