import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddClaimDialogComponent } from './add-claims-dialog.component';

describe('FormDialogComponent', () => {
  let component: AddClaimDialogComponent;
  let fixture: ComponentFixture<AddClaimDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClaimDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClaimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
