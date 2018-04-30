import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | calculator component', function(hooks) {
  setupRenderingTest(hooks);

  test('should display calculator', async function(assert) {
    await render(hbs`{{calculator-component class="content-wrapper"}}`);
    assert.ok(this.element.querySelector('.calculator'), 'calculator element exists');
  });

  test('should have theme', async function(assert) {
    await render(hbs`{{calculator-component class="content-wrapper"}}`);
    assert.equal(this.$('.current-theme').text(), 'Current Theme: default');
    assert.ok(this.element.querySelector('.theme-default'), 'theme class exists');
  });
});