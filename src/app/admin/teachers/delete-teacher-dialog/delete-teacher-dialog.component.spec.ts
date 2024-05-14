import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteTeacherDialogComponent } from './delete-teacher-dialog.component';

describe('FormDialogComponent', () => {
  let component: DeleteTeacherDialogComponent;
  let fixture: ComponentFixture<DeleteTeacherDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTeacherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
