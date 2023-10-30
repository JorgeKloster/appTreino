import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncluirPage } from './incluir.page';

describe('IncluirPage', () => {
  let component: IncluirPage;
  let fixture: ComponentFixture<IncluirPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IncluirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
