import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetComments } from './get-comments';

describe('GetComments', () => {
  let component: GetComments;
  let fixture: ComponentFixture<GetComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetComments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
