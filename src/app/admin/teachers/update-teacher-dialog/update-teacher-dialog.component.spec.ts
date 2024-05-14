import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateTeacherDialogComponent } from './update-teacher-dialog.component';

describe('FormDialogComponent', () => {
  let component: UpdateTeacherDialogComponent;
  let fixture: ComponentFixture<UpdateTeacherDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTeacherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
