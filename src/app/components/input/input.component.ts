import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  public label: string = '';
  public errorMsg: string = '';
  public form: FormGroup = this.fb.group({
    cardNumber: [
      null,
      [Validators.required, Validators.maxLength(16), Validators.minLength(14)],
    ],
  });
  constructor(private fb: FormBuilder) {}

  get mns() {
    return this.form.controls;
  }

  ngOnInit(): void {}

  /**
   * Valida que so ingrese numeros
   * @param e
   * @returns
   */
  validCardNumber(e: any) {
    let input = String.fromCharCode(e.keyCode);
    if (/^\d*\.?\d*$/.test(input)) {
      return true;
    } else {
      return false;
    }
  }

  submit() {
    const numberCard = this.form.controls.cardNumber.value.split('');

    let serie = numberCard.reduce(
      (a: any, d: any) => (a[d] ? (a[d] += 1) : (a[d] = 1), a),
      {}
    );
    console.log(serie);
    let filter = Object.values(serie).sort();
    let num = filter[filter.length - 1];
    this.label = `El número de la suerte es:${num}`;
  }
}
