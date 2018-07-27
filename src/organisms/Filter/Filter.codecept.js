Feature('Filter');

Scenario('test something', (I) => {
  I.amOnComponentPage('Filter');
  I.say('I see all fruits');
  I.see('orange');
  I.see('apple');
  I.see('pineapple');
  I.see('banana');

  I.fillField('', 'apple');

  I.waitForInvisible('.dc-filter-spinner');

  I.say('I see only "*apples"');
  I.dontSee('orange');
  I.see('apple');
  I.see('pineapple');
  I.dontSee('banana');
});
