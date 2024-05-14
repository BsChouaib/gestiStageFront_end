import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddTeacherDialogComponent } from './add-teacher-dialog.component';

describe('FormDialogComponent', () => {
  let component: AddTeacherDialogComponent;
  let fixture: ComponentFixture<AddTeacherDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeacherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
