import Model, { attr } from '@ember-data/model';

export default class Theme extends Model {
  @attr('string') name!: string;
  @attr('string') className!: string;
  @attr('boolean') isSelected!: boolean;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'theme': Theme;
  }
}
