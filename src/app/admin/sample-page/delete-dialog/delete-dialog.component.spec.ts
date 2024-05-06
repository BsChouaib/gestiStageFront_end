import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteSubjectDialogComponent } from './delete-dialog.component';

describe('FormDialogComponent', () => {
  let component: DeleteSubjectDialogComponent;
  let fixture: ComponentFixture<DeleteSubjectDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSubjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
