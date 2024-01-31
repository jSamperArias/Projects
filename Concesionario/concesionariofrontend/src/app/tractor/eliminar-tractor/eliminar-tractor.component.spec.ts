import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTractorComponent } from './eliminar-tractor.component';

describe('EliminarTractorComponent', () => {
  let component: EliminarTractorComponent;
  let fixture: ComponentFixture<EliminarTractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarTractorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarTractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
