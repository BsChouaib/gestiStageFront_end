import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateClaimDialogComponent } from './update-claims-dialog.component';

describe('FormDialogComponent', () => {
  let component: UpdateClaimDialogComponent;
  let fixture: ComponentFixture<UpdateClaimDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClaimDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClaimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
