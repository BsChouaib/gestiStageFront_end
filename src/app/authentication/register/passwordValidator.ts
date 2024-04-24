import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


/* export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    const errors: ValidationErrors = {};
  
    if (!value) {
      return null;
    }
  
    const upperCaseCharacters = /[A-Z]+/g;
    if (!upperCaseCharacters.test(value)) {
      errors.upperCase = true;
    }
  
    const lowerCaseCharacters = /[a-z]+/g;
    if (!lowerCaseCharacters.test(value)) {
      errors.lowerCase = true;
    }
  
    const numberCharacters = /[0-9]+/g;
    if (!numberCharacters.test(value)) {
      errors.number = true;
    }
  
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacters.test(value)) {
      errors.specialCharacter = true;
    }
  
    if (value.length < 6) {
      errors.minLength = true;
    }
  
    return Object.keys(errors).length ? errors : null;
  };
 */
  export const passwordMatchValidator = function (control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const errors: ValidationErrors = {};
  
    if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
    } 

    return Object.keys(errors).length ? errors : null;
  };
