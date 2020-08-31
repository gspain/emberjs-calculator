import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visitig /', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/', 'should redirect automatically');
  });

  test('visiting /', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/', 'should show the calculator page');
  });

  test('link to themes', async function (assert) {
    await visit('/');
    await click(".menu-themes");
    assert.equal(currentURL(), '/themes', 'should navigate to themes');
  });
});
