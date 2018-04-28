import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import { render, click, hooks } from '@ember/test-helpers';

moduleForComponent('theme-option-component', 'Integration | Component | theme option component', {
  integration: true
});

hooks.beforeEach(function () {
  this.theme = EmberObject.create({
    "class-name": 'test-class-name',
    name: 'test-name'
  });
});

test('should display theme details', async function(assert) {
  await render(hbs`{{theme-option-component theme=theme}}`);
  assert.equal(this.$('.theme .title').text(), 'test-name', 'test-name');
  //assert.equal(this.$('.theme .description').text().trim(), 'test-description', 'test-description');
});

test('should toggle isSelected on click', async function(assert) {
  await render(hbs`{{theme-option-component theme=theme}}`);
  assert.notOk(this.element.querySelector('.select-theme'), 'initially rendered button');
  await click('.select-theme');
  assert.ok(this.element.querySelector('.current-theme'), 'rendered text after click');
});
