Feature('Accordion');

Scenario('opens accordion on click', (I) => {
  I.amOnComponentPage('Accordion');
  I.click('.dc-accordion-panel:nth-child(2)');
  I.see('Content of Second Panel');
  I.click('.dc-accordion-panel:nth-child(3)');
  I.see('Content of Third Panel');
});
