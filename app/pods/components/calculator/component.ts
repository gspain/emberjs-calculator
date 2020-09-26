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
  number(value: number) {
    if (this.display === '0' || isNaN(parseFloat(this.display))) {
      this.display = '';
    }

    if (this.display === '-0') {
      this.display = '-';
    }

    if (this.display.length < 12) {
      this.display += value;
    }
  }

  @action
  decimal(value: string) {
    if (!this.display.includes(value)) {
      this.display += value;
    }

    if (isNaN(parseFloat(this.display))) {
      this.display = '0' + value;
    }
  }

  @action
  negate() {
    if (!isNaN(parseFloat(this.display))) {
      this.display.includes('-')
        ? this.display = this.display.slice(1)
        : this.display = '-' + this.display;
    }
  }

  @action
  operator(value: string) {
    let lastLogged = this.log[this.log.length-1];

    if (!isNaN(parseFloat(this.display))) {
      this.log += " " + this.display + " " + value;
     }

    if(!isNaN(parseFloat(lastLogged))) {
      this.log += " " + value;
    }

    if (lastLogged !== '.') {
      this.log = this.log.substring(0, this.log.length-1) + value;
    }

    this.display = value;
  }

  @action
  percent() {
    if (this.display !== '0' && !isNaN(parseFloat(this.display))) {
      this.log = this.log + " " + this.display + ' / 100';
      this.display = '';
      this.equals();
    }
  }

  @action
  equals() {
    if(!this.display && this.log) {
      const evaluate = Function('"use strict";return (' + this.log + ')')();
      this.display = evaluate.toString();
      this.log = '';
    }

    if (this.display && !isNaN(parseFloat(this.display))) {
      this.log !== ''
        ? this.log += " " + this.display
        : this.log = this.display;

      const evaluate = Function('"use strict";return (' + this.log + ')')();

      if (evaluate.toString().length > 12) {
        let formattedAns = evaluate.toPrecision(6);
        this.log = formattedAns.toString();
      } else {
        this.log = evaluate.toString();
      }

      this.display = this.log;
      this.log = '';
    }
  }

  @action
  clear() {
    this.display = '0';
    this.log = '';
  }
}
