import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModificationClientComponent } from './ajout-modification-client.component';

describe('AjoutModificationClientComponent', () => {
  let component: AjoutModificationClientComponent;
  let fixture: ComponentFixture<AjoutModificationClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutModificationClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutModificationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
