import Route from '@ember/routing/route';
import Store from '@ember-data/store';
import CurrentTheme from 'emberjs-calculator/pods/current-theme/service';
import { inject as service } from '@ember/service';

export default class Themes extends Route {
  @service store!: Store;
  @service currentTheme!: CurrentTheme;

  model() {
    return this.store.findAll('theme', {});
  }

  afterModel() {
    this.store.push({
      data: [{
        id: '0',
        type: 'theme',
        attributes: this.currentTheme.defaultTheme
      }]
    });
  }
}
