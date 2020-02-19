import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VerificationComponent} from './verification.component';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {FormGroup} from "@angular/forms";
import {FooterComponent} from "../../layout/footer/footer.component";

describe('VerificationComponent', () => {
  let component: VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationComponent, NavbarComponent, FooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
