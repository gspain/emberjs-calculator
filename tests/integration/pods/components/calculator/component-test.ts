import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('should display calculator', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);
    assert.ok(this.element.querySelector('.calculator'), 'calculator element exists');
  });

  test('should have theme', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);
    assert.equal(this.element.querySelector('.current-theme').textContent, 'Current Theme: default');
    assert.ok(this.element.querySelector('.theme-default'), 'theme class exists');
  });

  test('should start at 0', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);
    assert.equal(this.element.querySelector('.display').textContent.trim(), '0');
  });

  test('should show entry on the display', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="5"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '5');

    await click('[data-value="*"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '*');

    await click('[data-value="."]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '0.');
  });

  test('should append entries to display', async function(assert) {
    await render(hbs`{{calculator-component class="content-wrapper"}}`);

    await click('[data-value="5"]');
    await click('[data-value="6"]');
    await click('[data-value="."]');
    await click('[data-value="8"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '56.8');
  });

  test('should only allow 12 digits to be entered', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]');
    await click('[data-value="3"]'); //13
    await click('[data-value="3"]'); //14
    assert.equal(this.element.querySelector('.display').textContent.trim(), '333333333333');
  });

  test('should clear', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="1"]');
    await click('[data-value="2"]');
    await click('[data-value="3"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '123');

    await click('[data-value="AC"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '0');
  });

  test('should negate number', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    //starting at 0
    assert.equal(this.element.querySelector('.display').textContent.trim(), '0');

    await click('[data-value="+-"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '-0');

    await click('[data-value="9"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '-9');

    //other numbers
    await click('[data-value="AC"]');
    await click('[data-value="1"]');
    await click('[data-value="+-"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '-1');
  });

  test('should multiply', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="1"]');
    await click('[data-value="*"]');
    await click('[data-value="2"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '2');

    //negative numbers
    await click('[data-value="AC"]');
    await click('[data-value="2"]');
    await click('[data-value="+-"]');
    await click('[data-value="*"]');
    await click('[data-value="2"]');
    await click('[data-value="+-"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '4');

    //0
    await click('[data-value="AC"]');
    await click('[data-value="1"]');
    await click('[data-value="*"]');
    await click('[data-value="0"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '0');
  });

  test('should add', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="1"]');
    await click('[data-value="+"]');
    await click('[data-value="1"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '2');

    //negative numbers
    await click('[data-value="AC"]');
    await click('[data-value="1"]');
    await click('[data-value="+-"]');
    await click('[data-value="+"]');
    await click('[data-value="1"]');
    await click('[data-value="+-"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '-2');

    //0
    await click('[data-value="AC"]');
    await click('[data-value="1"]');
    await click('[data-value="+"]');
    await click('[data-value="0"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '1');
  });

  test('should subtract', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="1"]');
    await click('[data-value="-"]');
    await click('[data-value="1"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '0');

    //negative numbers
    await click('[data-value="AC"]');
    await click('[data-value="1"]');
    await click('[data-value="+-"]');
    await click('[data-value="-"]');
    await click('[data-value="1"]');
    await click('[data-value="+-"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '0');

    //0
    await click('[data-value="AC"]');
    await click('[data-value="1"]');
    await click('[data-value="-"]');
    await click('[data-value="0"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '1');
  });

  test('should divide', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="4"]');
    await click('[data-value="/"]');
    await click('[data-value="2"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '2');

    //negatives
    await click('[data-value="AC"]');
    await click('[data-value="2"]');
    await click('[data-value="+-"]');
    await click('[data-value="/"]');
    await click('[data-value="2"]');
    await click('[data-value="+-"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '1');

    //0
    await click('[data-value="AC"]');
    await click('[data-value="9"]');
    await click('[data-value="/"]');
    await click('[data-value="0"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), 'Infinity');
  });

  test('should calculate up to 12 digits', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="3"]');
    await click('[data-value="."]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="+"]');
    await click('[data-value="3"]');
    await click('[data-value="."]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="2"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '6.444444444');
  });

  test('should format to 6 digits if length of the calculated answer is greater than 12', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="."]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="="]');
    await click('[data-value="*"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="."]');
    await click('[data-value="9"]');
    await click('[data-value="9"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '1.00000e+14');
  });

  test('should calculate percent', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="9"]');
    await click('[data-value="%"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '0.09');
  });

  test('should continue calculating with answer', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="1"]');
    await click('[data-value="+"]');
    await click('[data-value="1"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '2');

    await click('[data-value="*"]');
    await click('[data-value="5"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '10');
  });

  test('should continue calculating with answer negation', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="1"]');
    await click('[data-value="+"]');
    await click('[data-value="1"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '2');

    await click('[data-value="+-"]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '-2');

    await click('[data-value="*"]');
    await click('[data-value="5"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '-10');
  });

  test('should calculate using order of operations', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="AC"]');
    await click('[data-value="1"]');
    await click('[data-value="*"]');
    await click('[data-value="2"]');
    await click('[data-value="+"]');
    await click('[data-value="6"]');
    await click('[data-value="-"]');
    await click('[data-value="1"]');
    await click('[data-value="0"]');
    await click('[data-value="/"]');
    await click('[data-value="5"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '6');
  });

  test('should use last pressed operator if more than one pressed before a number', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="2"]');
    await click('[data-value="+"]');
    await click('[data-value="/"]');
    await click('[data-value="-"]');
    await click('[data-value="*"]');
    await click('[data-value="3"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '6');
  });

  test('should not allow calculations ending with an operator', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="1"]');
    await click('[data-value="+"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '+');
  });

  test('should not calculate just numbers', async function(assert) {
    await render(hbs`{{calculator class="content-wrapper"}}`);

    await click('[data-value="1"]');
    await click('[data-value="="]');
    assert.equal(this.element.querySelector('.display').textContent.trim(), '1');
  });
});
