import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleColisComponent } from './single-colis.component';

describe('SingleColisComponent', () => {
  let component: SingleColisComponent;
  let fixture: ComponentFixture<SingleColisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleColisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
