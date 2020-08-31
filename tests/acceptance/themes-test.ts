import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | themes', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /themes', async function(assert) {
    await visit('/themes');
    assert.equal(currentURL(), '/themes');
  });

  test('should display 4 themes', async function(assert) {
    await visit('/themes');
    assert.equal(this.element.querySelectorAll('.theme').length, 4);
  });

  test('should link to the calculator', async function (assert) {
    await visit('/themes');
    await click(".menu-home");
    assert.equal(currentURL(), '/calculator');
  });
});
