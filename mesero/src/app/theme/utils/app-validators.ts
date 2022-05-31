import { FormGroup, FormControl } from '@angular/forms';

export function emailValidator(control: FormControl): {[key: string]: boolean} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;   
    if (control.value && !emailRegexp.test(control.value)) { 
        return {invalidEmail: true};
    }
    return { };
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
}

export function maxWordsValidator(maxWordsCount: number) {
	return function maxWordsValidator(control: FormControl): { [key: string]: boolean } {
		if(control.value){
			let nameSplit = control.value.trim().split(' ');
			if (nameSplit.length > maxWordsCount) {
				return {
					maxNumberOfWordsExceeded: true
				}
			}
		}
		return { };
	}
}