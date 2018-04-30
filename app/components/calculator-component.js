import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  currentTheme: service(),
  log: '',
  display: '0',

  actions: {
    entry (value) {
      if (!isNaN(value)) {
       this.send('number', value);
      }

      if (value === '+' || value === '-' || value === '/' || value === '*') {
        this.send('operator', value);
      }

      if (value === '.') {
        this.send('decimal', value);
      }

      if (value === '+-') {
        this.send('negate');
      }

      if (value === '%') {
        this.send('percent');
      }

      if (value === '=') {
        this.send('equals');
      }

      if (value === 'clear') {
        this.send('clear');
      }
    },
    number (value) {
      let display = this.get('display');

      if (display === '0' || isNaN(display)) {
        display = '';
      }

      if (display === '-0') {
        display = '-';
      }

      if (display.length < 12) {
        display += value;
      }

      this.set('display', display);
    },
    decimal (value) {
      let display = this.get('display');

      if (!display.includes(value)) {
        display += value;
      }

      if (isNaN(display)) {
        display = '0' + value;
      }

      this.set('display', display);
    },
    negate () {
      let display = this.get('display');

      if (!isNaN(display)) {
        display.includes('-')
          ? display = display.slice(1)
          : display = '-' + display;
      }
      
      this.set('display', display);
    },
    operator (value) {
      let display = this.get('display');
      let log = this.get('log');
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

      this.set('log', log);
      this.set('display', value);
    },
    percent () {
      let display = this.get('display');
      let log = this.get('log');

      if (display !== '0' && !isNaN(display)) {
        log = display + ' / 100';

        this.set('display', '');
        this.set('log', log);
        this.send('equals', log);
      }
    },
    equals () {
      let display = this.get('display');
      let log = this.get('log');

      if (!isNaN(display)) {
        if (log !== '') {
          log += " " + display;
        } else {
          log = display;
        }

        let evaluate = Function('"use strict";return (' + log + ')')();

        if (evaluate.toString().length > 12) {
          let formattedAns = evaluate.toPrecision(6);
          log = formattedAns.toString();
        } else {
          log = evaluate.toString();
        }

        this.set('display', log);
        this.set('log', '');
      }
    },
    clear () {
      this.set('display', '0');
      this.set('log', '');
    }
  }
});
