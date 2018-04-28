import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  currentTheme: service(),
  log: '',
  display: '0',
  ans: '',
  ansLog: '',

  actions: {
    entry (value) {
      if (!isNaN(value)) {
       this.send('number', value);
      }

      if (value === '+' || value === '-' || value === '/' || value === '*' || value === '%') {
        this.send('operator', value);
      }

      if (value === '.') {
        this.send('decimal', value);
      }

      if (value === '+-') {
        this.send('negate');
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
      let log = this.get('log');
      let ans = this.get('ans');
      let ansLog = this.get('ansLog');

      if (display === '0' || isNaN(display)) {
        display = '';
      }

      if (display === '-0') {
        display = '-';
      }

      if (display.length < 12) {
        display += value;
        
        ans
          ? ansLog += value
          : log += value;

        this.set('log', log);
        this.set('ansLog', ansLog);
      }

      this.set('display', display);
    },
    decimal (value) {
      let display = this.get('display');
      let log = this.get('log');
      let ans = this.get('ans');
      let ansLog = this.get('ansLog');

      if (!display.includes(value)) {
        display += value;

        ans
          ? ansLog += value
          : log += value;

        this.set('log', log);
        this.set('ansLog', ansLog);
      }

      this.set('display', display);
    },
    negate () {
      let display = this.get('display');
      let ans = this.get('ans');
      let ansLog = this.get('ansLog');

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
      let ans = this.get('ans');
      let ansLog = this.get('ansLog');
      let lastLogged = log[log.length-1];
      let lastAnsLogged = ansLog[ansLog.length-1];

      if (log !== '' || display !== '0') {
        display = value;

        if(!isNaN(lastLogged) || !isNaN(lastAnsLogged)) {
          ans
            ? ansLog += value
            : log += value;
        }

        if (lastLogged !== '.' || lastAnsLogged !== '.') {
          ans
            ? ansLog = ansLog.substring(0, ansLog.length-1) + value
            : log = log.substring(0, log.length-1) + value;
        }

        this.set('log', log);
        this.set('ansLog', ansLog);
      }

      this.set('display', value);
    },
    round (value, precision) {
      let shift = function (value, precision, reverseShift) {
        if (reverseShift) {
          precision = -precision;
        }  
        let numArray = ("" + value).split("e");
        return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
      };

      let rounded = shift(Math.round(shift(value, precision, false)), precision, true);
      this.set('round', rounded);
    },
    equals () {
      let display = this.get('display');
      let log = this.get('log');
      let ans = this.get('ans');
      let ansLog = this.get('ansLog');

      if ((display === '0' || !isNaN(display)) && log !== '') {
        let evaluate;

        if (ans) {
          evaluate = Function('"use strict";return (' + ansLog + ')')();
        } else {
          evaluate = Function('"use strict";return (' + log + ')')();
        }

        if (evaluate.toString().length > 12) {
          this.send('round', evaluate, 2);
          let roundedAnswer = this.get('round');
          ans = roundedAnswer.toString();
        } else {
          ans = evaluate.toString();
        }
        
        ansLog = ans;

        this.set('ansLog', ansLog);
        this.set('ans', ans);
        this.set('display', ans);
      }
    },
    clear () {
      this.set('display', '0');
      this.set('log', '');
      this.set('ans', '');
      this.set('ansLog', '');
    }
  }
});
