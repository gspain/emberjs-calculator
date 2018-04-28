import { isEmpty } from '@ember/utils';
import { computed, observer } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  currentTheme: 'default',
  
  name: computed('currentTheme', function() {
    const theme = this.get('currentTheme');
    return `${theme}`;
  }),

  themeChanged: observer('currentTheme', function() {
    this.notifyPropertyChange('name');
  }),

  setTheme (theme) {
    this.set('currentTheme', isEmpty(theme) ? 'default' : theme);
  }
});
