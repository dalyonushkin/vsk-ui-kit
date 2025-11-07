import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VskUiKit } from './vsk-ui-kit';

describe('VskUiKit', () => {
  let component: VskUiKit;
  let fixture: ComponentFixture<VskUiKit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VskUiKit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VskUiKit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
