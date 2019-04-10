import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardColisComponent } from './dashboard-colis.component';

describe('DashboardColisComponent', () => {
  let component: DashboardColisComponent;
  let fixture: ComponentFixture<DashboardColisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardColisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
