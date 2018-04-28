import { test } from 'qunit';
import moduleForAcceptance from 'emberjs-calculator/tests/helpers/module-for-acceptance';
import {
  click,
  currentURL,
  visit
} from '@ember/test-helpers';

moduleForAcceptance('Acceptance | themes');

test('should list available themes', async function(assert) {
  await visit('/themes');
  assert.equal(this.element.querySelectorAll('.theme').length, 4, 'should display 4 themes');
});

test('should show themes', async function (assert) {
  await visit('/themes');
  assert.equal(currentURL(), '/themes', 'should show themes');
});

test('should link to calculator/index', async function (assert) {
  await visit('/');
  await click(".menu-home");
  assert.equal(currentURL(), '/calculator', 'should navigate to calculator');
});
