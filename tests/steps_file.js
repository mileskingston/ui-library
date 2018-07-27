// in this file you can append custom step methods to 'I' object

module.exports = () => actor({

  amOnComponentPage(componentName) {
    this.say(`I open component page: ${componentName}`);
    this.amOnPage(`/#!/${componentName}`);
  }

});
