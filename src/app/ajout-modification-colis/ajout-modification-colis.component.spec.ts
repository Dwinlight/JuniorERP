import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModificationColisComponent } from './ajout-modification-colis.component';

describe('AjoutModificationColisComponent', () => {
  let component: AjoutModificationColisComponent;
  let fixture: ComponentFixture<AjoutModificationColisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutModificationColisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutModificationColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
