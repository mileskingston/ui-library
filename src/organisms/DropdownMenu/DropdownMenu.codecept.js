Feature('DropdownMenu');

Scenario('opens on hover', (I) => {
  I.amOnComponentPage('DropdownMenu');
  I.moveCursorTo('.dc-menu-wrapper');
  I.executeScript(() => {
    document.querySelector('.dc-menu-wrapper').dispatchEvent(new Event('mouseenter'));
  });
  I.waitForVisible('.dc-menu');
  I.see('Your orders');
});
