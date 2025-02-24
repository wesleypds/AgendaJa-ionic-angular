import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CpfValidator {
  static validCpf(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value as string;

    if (!cpf) {
      return null; // Se o campo estiver vazio, não aplica a validação
    }

    // Expressão regular para validar o formato do CPF (000.000.000-00)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!cpfRegex.test(cpf)) {
      return {
        invalidCpf: 'O CPF deve estar no formato 000.000.000-00.',
      };
    }

    // Validação de CPF com base nos números (sem considerar formatação)
    const numbersOnly = cpf.replace(/\D/g, ''); // Remove os caracteres não numéricos

    if (!this.isValidCpf(numbersOnly)) {
      return {
        invalidCpf: 'O CPF informado é inválido.',
      };
    }

    return null; // CPF válido
  }

  private static isValidCpf(cpf: string): boolean {
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se o CPF não é um número repetido (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Cálculo dos dígitos verificadores (os dois últimos números do CPF)
    let sum = 0;
    let rest;

    // Cálculo do primeiro dígito
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(9))) return false;

    // Cálculo do segundo dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(10))) return false;

    return true; // CPF válido
  }
}
