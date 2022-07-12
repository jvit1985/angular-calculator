import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angular-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    
  }
  
  input: string = '';
  result: string = '';

  getNumber(num: string) {
    if (num == ".") {
      if (this.input != "") {
        const lastNum = this.getLastOperand()
        if (lastNum.lastIndexOf(".") >= 0) {
          return
        }
      }
    }

    if (num == '0') {
      if (this.input == "") {
        return;
      }
      const priorKey = this.input[this.input.length - 1];
      if (priorKey === '/' || priorKey === '*' || priorKey === '+' || priorKey === '-') {
        return;
      }
    }

    this.input = this.input + num
    this.calculateAnswer();
  }

  getLastOperand() {
    let position: number;
    position = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > position) position = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("/") > position) position = this.input.lastIndexOf("/")
    if (this.input.toString().lastIndexOf("*") > position) position = this.input.lastIndexOf("*")
    return this.input.substring(position + 1)
  }

  getOperation(oper: string) {
    const finalKey = this.input[this.input.length - 1];
    if (finalKey === '+' || finalKey === '-' || finalKey === '/' || finalKey === '*') {
      return;
    }

    this.input = this.input + oper
    this.calculateAnswer();
  }

  clear() {
    if (this.input != "") {
      this.input = this.input.substring(0, this.input.length -1)
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calculateAnswer() {
    let formula = this.input;

    let finalKey = formula[formula.length - 1];

    if (finalKey === '.') {
      formula = formula.substring(0, formula.length - 1);
    }

    finalKey = formula[formula.length - 1];

    if (finalKey === '/' || finalKey === '*' || finalKey === '-' || finalKey === '+') {
      formula = formula.substring(0, formula.length - 1);
    }

    this.result = eval(formula);

  }

  getAnswer() {
    this.calculateAnswer();
    this.input = this.result;
    if (this.input == "0") this.input = "";
  }

}
