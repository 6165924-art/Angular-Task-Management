import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProjects } from './get-projects';

describe('GetProjects', () => {
  let component: GetProjects;
  let fixture: ComponentFixture<GetProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetProjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
