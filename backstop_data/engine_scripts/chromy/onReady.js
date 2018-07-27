module.exports = function(chromy, scenario, vp) {
  console.log(`SCENARIO > ${scenario.label}`);
  require('./clickAndHoverHelper')(chromy, scenario);
  // add more ready handlers here...

  // Remove .dc-spin class and theme-switcher
  chromy.evaluate(() => {
    document.querySelectorAll('.dc-spin').forEach((el) => {
      el.classList.remove('dc-spin');
    });
    document.querySelector('[class*="rsg--sidebar"]').style.display = 'none';

    document.getElementById('theme-switcher').style.display = 'none';
  });
};
