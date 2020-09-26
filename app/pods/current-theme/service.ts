import Service from '@ember/service';
import Theme from 'emberjs-calculator/pods/theme/model';
import { isEmpty } from '@ember/utils';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CurrentTheme extends Service {
  @tracked defaultTheme = {
      id: '0',
      name: 'Default',
      className: 'default',
      isSelected: true
  } as Theme;

  @tracked theme: Theme = this.defaultTheme;
  @tracked themeChanged = false;

  @action
  setTheme(theme: Theme) {
    const currentTheme = this.theme;
    this.theme = isEmpty(theme) ? this.defaultTheme : theme;
    this.themeChanged = this.theme.name !== currentTheme.name;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'current-theme': CurrentTheme;
  }
}
