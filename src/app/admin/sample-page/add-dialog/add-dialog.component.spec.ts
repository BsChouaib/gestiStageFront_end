import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSubjectDialogComponent } from './add-dialog.component';

describe('FormDialogComponent', () => {
  let component: AddSubjectDialogComponent;
  let fixture: ComponentFixture<AddSubjectDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
