import DS from 'ember-data';

export default class Application extends DS.JSONAPIAdapter {
  host = 'https://s3.amazonaws.com/gavant-public';
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    'application': Application;
  }
}
