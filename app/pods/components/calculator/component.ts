import Component from '@glimmer/component';
import CurrentTheme from 'emberjs-calculator/pods/current-theme/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface CalculatorArgs {}

export default class Calculator extends Component<CalculatorArgs> {
  @service currentTheme!: CurrentTheme;

  @tracked log = '';
  @tracked display = '0';

  @action
  entry(value: string) {
    value === '+' || value === '-' || value === '/' || value === '*'
      ? this.operator(value)
    : value === '.'
      ? this.decimal(value)
    : value === '+-'
      ? this.negate()
    : value === '%'
      ? this.percent()
    : value === '='
      ? this.equals()
    : value === 'clear'
      ? this.clear()
      : this.number(value);
  }

  @action
  number(value: string) {
    let display = this.display;

    if (display === '0' || isNaN(display)) {
      display = '';
    }

    if (display === '-0') {
      display = '-';
    }

    if (display.length < 12) {
      display += value;
    }

    this.display = display;
  }

  @action
  decimal(value: string) {
    let display = this.display;

    if (!display.includes(value)) {
      display += value;
    }

    if (isNaN(display)) {
      display = '0' + value;
    }

    this.display = display;
  }

  @action
  negate() {
    let display = this.display;

    if (!isNaN(display)) {
      display.includes('-')
        ? display = display.slice(1)
        : display = '-' + display;
    }

    this.display = display;
  }

  @action
  operator(value: string) {
    let display = this.display;
    let log = this.log;
    let lastLogged = log[log.length-1];

    if (!isNaN(display)) {
      log += " " + display + " " + value;
     }

    if(!isNaN(lastLogged)) {
      log += " " + value;
    }

    if (lastLogged !== '.') {
      log = log.substring(0, log.length-1) + value;
    }

    this.log = log;
    this.display = value;
  }

  @action
  percent() {
    let display = this.display;
    let log = this.log;

    if (display !== '0' && !isNaN(display)) {
      log = display + ' / 100';

      this.display = '';
      this.log = log;
      this.equals();
    }
  }

  @action
  equals() {
    let display = this.display;
    let log = this.log;

    if (!isNaN(display)) {
      log !== ''
        ? log += " " + display
        : log = display;

      let evaluate = Function('"use strict";return (' + log + ')')();

      if (evaluate.toString().length > 12) {
        let formattedAns = evaluate.toPrecision(6);
        log = formattedAns.toString();
      } else {
        log = evaluate.toString();
      }

      this.display = log;
      this.log = '';
    }
  }

  @action
  clear() {
    this.display = '0';
    this.log = '';
  }
}
