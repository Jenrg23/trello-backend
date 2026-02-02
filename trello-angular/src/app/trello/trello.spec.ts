import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trello } from './trello';

describe('Trello', () => {
  let component: Trello;
  let fixture: ComponentFixture<Trello>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trello]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trello);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
