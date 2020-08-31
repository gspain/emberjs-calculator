import Component from '@glimmer/component';
import Theme from 'emberjs-calculator/pods/theme/model';
import Router from '@ember/routing/router-service';
import CurrentTheme from 'emberjs-calculator/pods/current-theme/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

interface ThemeOptionArgs {
  themes: Theme[];
}

export default class ThemeOption extends Component<ThemeOptionArgs> {
  @service router!: Router;
  @service currentTheme!: CurrentTheme;

  @action
  setTheme(theme: Theme) {
    this.args.themes.forEach(theme => {
      theme.isSelected = false;
    });
    theme.isSelected = true;
    this.currentTheme.setTheme(theme);
    this.router.transitionTo('/');
  }
}
