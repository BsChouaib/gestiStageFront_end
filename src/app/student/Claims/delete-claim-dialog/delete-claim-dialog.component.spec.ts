import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteClaimDialogComponent } from './delete-claim-dialog.component';

describe('FormDialogComponent', () => {
  let component: DeleteClaimDialogComponent;
  let fixture: ComponentFixture<DeleteClaimDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteClaimDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClaimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
