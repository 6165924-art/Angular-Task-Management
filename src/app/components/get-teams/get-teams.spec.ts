import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTeams } from './get-teams';

describe('GetTeams', () => {
  let component: GetTeams;
  let fixture: ComponentFixture<GetTeams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTeams]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTeams);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
