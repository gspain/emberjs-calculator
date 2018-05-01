import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  router: service(),
  currentTheme: service(),

  actions: {
    setTheme (theme) {
      this.get("themes").forEach(theme => {
        theme.set('isSelected', false);
      });
      theme.set('isSelected', true);
      this.get('currentTheme').setTheme(theme['class-name']);
      this.get('router').transitionTo('/');
    }
  }
});
