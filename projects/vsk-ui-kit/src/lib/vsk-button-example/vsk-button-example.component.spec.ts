import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VskButtonExampleComponent } from './vsk-button-example.component';

describe('VskButtonExampleComponent', () => {
  let fixture: ComponentFixture<VskButtonExampleComponent>;
  let component: VskButtonExampleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VskButtonExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VskButtonExampleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Primary');
    fixture.detectChanges();
  });

  it('should render the label text', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Primary');
  });

  it('should expose disabled state via aria-disabled and disabled attributes', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should reflect variant via modifier class for styling hooks', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('vsk-button--secondary')).toBeTrue();
  });
});
