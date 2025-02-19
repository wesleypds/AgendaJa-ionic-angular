import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
  static strongPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;

    if (!password) {
      return null; // Se o campo estiver vazio, não aplica a validação
    }

    // Expressão regular para validar a senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return {
        strongPassword: 'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial.',
      };
    }

    return null; // Senha válida
  }
}
