import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | calculator', function(hooks) {
  setupApplicationTest(hooks);

  test('visitig /', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/calculator', 'should redirect automatically');
  });
  
  test('visiting /calculator', async function(assert) {
    await visit('/calculator');
    assert.equal(currentURL(), '/calculator', 'should show the calculator page');
  });

  test('link to themes', async function (assert) {
    await visit('/calculator');
    await click(".menu-themes");
    assert.equal(currentURL(), '/themes', 'should navigate to themes');
  });
});

