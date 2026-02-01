import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTasks } from './get-tasks';

describe('GetTasks', () => {
  let component: GetTasks;
  let fixture: ComponentFixture<GetTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
