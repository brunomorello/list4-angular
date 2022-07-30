import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShoppingCartModalComponent } from './select-shopping-cart-modal.component';

describe('SelectShoppingCartModalComponent', () => {
  let component: SelectShoppingCartModalComponent;
  let fixture: ComponentFixture<SelectShoppingCartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectShoppingCartModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectShoppingCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
