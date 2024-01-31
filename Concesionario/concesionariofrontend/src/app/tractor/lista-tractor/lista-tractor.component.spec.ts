import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTractorComponent } from './lista-tractor.component';

describe('ListaTractorComponent', () => {
  let component: ListaTractorComponent;
  let fixture: ComponentFixture<ListaTractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaTractorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaTractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
