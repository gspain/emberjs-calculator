import Application from 'emberjs-calculator/app';
import config from 'emberjs-calculator/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
