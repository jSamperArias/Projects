import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaModeloComponent } from './lista-modelo.component';

describe('ListaModeloComponent', () => {
  let component: ListaModeloComponent;
  let fixture: ComponentFixture<ListaModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
