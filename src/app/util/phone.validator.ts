import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PhoneValidator {
  static validPhone(control: AbstractControl): ValidationErrors | null {
    const phone = control.value as string;

    if (!phone) {
      return null; // Se o campo estiver vazio, não aplica a validação
    }

    // Expressão regular para validar o formato do telefone (11 dígitos + formatação)
    const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

    if (!phoneRegex.test(phone)) {
      return {
        invalidPhone: 'O telefone deve estar no formato (00) 00000-0000.',
      };
    }

    return null; // Telefone válido
  }
}
