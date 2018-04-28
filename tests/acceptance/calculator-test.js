import { test } from 'qunit';
import moduleForAcceptance from 'emberjs-calculator/tests/helpers/module-for-acceptance';
import {
  click,
  currentURL,
  visit
} from '@ember/test-helpers';

moduleForAcceptance('Acceptance | calculator');

test('should link to themes', async function (assert) {
  await visit('/themes');
  await click(".menu-themes");
  assert.equal(currentURL(), '/themes', 'should navigate to themes');
});

test('should show calculator as the index', async function (assert) {
  await visit('/');
  assert.equal(currentURL(), '/calculator', 'should redirect automatically');
});
