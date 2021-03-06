import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | theme-option-component', function(hooks) {
  setupRenderingTest(hooks);

  test('should render no themes and display message', async function(assert) {
    this.set('themes', []);

    await render(hbs`{{theme-option-component themes=themes theme=theme isSelected=isSelected class="column"}}`);
    assert.equal(this.element.querySelectorAll('.theme').length, 0);
    assert.equal(this.element.querySelector('p').textContent, 'There are no available themes');
  });

  test('should render all themes', async function(assert) {
    this.set('themes', [
      { name: 'Default', "class-name": 'default', isSelected: true },
      { name: 'Light', "class-name": 'light', isSelected: false },
      { name: 'Dark', "class-name": 'dark', isSelected: false },
      { name: 'Colors', "class-name": 'colors', isSelected: false }
    ]);

    await render(hbs`{{theme-option-component themes=themes theme=theme isSelected=isSelected class="column"}}`);
    assert.equal(this.element.querySelectorAll('.theme').length, 4);
  });

  test('should render default active theme', async function(assert) {
    this.set('themes', [
      { name: 'Default', "class-name": 'default', isSelected: true }
    ]);

    await render(hbs`{{theme-option-component themes=themes theme=theme isSelected=isSelected class="column"}}`);
    assert.equal(this.element.querySelectorAll('.theme-wrapper.active').length, 1);
    assert.equal(this.element.querySelector('.theme-wrapper.active .theme.default .title').textContent, 'Default');
    assert.ok(this.element.querySelector('.theme-wrapper.active .current-theme'), 'Current theme text exists');
  });

  test('should render changed theme on click', async function(assert) {
    this.set('themes', [
      { name: 'Default', "class-name": 'default', isSelected: true },
      { name: 'Light', "class-name": 'light', isSelected: false }
    ]);

    this.owner.lookup('service:current-theme');
    
    await render(hbs`{{theme-option-component themes=themes theme=theme isSelected=isSelected class="column"}}`);
    assert.equal(this.element.querySelectorAll('.theme-wrapper.active').length, 1);
    assert.ok(this.element.querySelector('.theme-wrapper.active .theme.default'), 'Current theme is default');

    this.set('currentTheme', 'light');

    assert.equal(this.$('.theme-wrapper.active').length, 1);
    assert.ok(this.$('.theme-wrapper .theme.default'), 'default no longer active');
    assert.ok(this.$('.theme-wrapper .select-theme'), 'Select Theme text exists');
    assert.ok(this.$('.theme-wrapper.active .theme.light'), 'light is current theme');
    assert.ok(this.$('.theme-wrapper.active .current-theme'), 'current theme text exists');
  });
});
