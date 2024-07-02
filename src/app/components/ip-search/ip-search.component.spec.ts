import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpSearchComponent } from './ip-search.component';

describe('IpSearchComponent', () => {
  let component: IpSearchComponent;
  let fixture: ComponentFixture<IpSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
