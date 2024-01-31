import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarModeloComponent } from './eliminar-modelo.component';

describe('EliminarModeloComponent', () => {
  let component: EliminarModeloComponent;
  let fixture: ComponentFixture<EliminarModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
