import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import { render, hooks } from '@ember/test-helpers';

moduleForComponent('calculator-component', 'Integration | Component | calculator component', {
  integration: true
});

hooks.beforeEach(function () {
  this.theme = EmberObject.create({
    "class-name": 'test-class-name',
    name: 'test-name'
  });
});

test('should display calculator', async function(assert) {
  await render(hbs`{{calculator-component class="content-wrapper"}}`);
  assert.equal(this.$('.calculator'), 'calculator element exists');
});

test('should have theme', async function(assert) {
  await render(hbs`{{calculator-component class="content-wrapper"}}`);
  assert.equal(this.$('.current-theme').text(), 'test-name', 'test-name');
  assert.ok(this.element.querySelector('.theme-test-class-name'), 'theme class exists');
  //assert.ok(this.element.querySelector('.current-theme'), 'rendered text after click');
});