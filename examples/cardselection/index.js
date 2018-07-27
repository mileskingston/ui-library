import CardSelection from '../../lib/organisms/CardSelection/CardSelection.js';
import ReactDOM from 'react-dom';
import React from 'react';

require('../../lib/style/common.styl');

var initialState = {
  cards: [
    {
      id: 'monthly-plan',
      title: 'Monthly Plan',
      features: [
        'Unlimited repairs due to faults or mishaps',
        'Fixed in 7 days or we\'ll replace with new',
        'Annual appliance check and deep clean'
      ],
      price: 4.5,
      priceInfo: 'a month',
      label: 'No minimum term'
    },
    {
      id: 'yearly-plan-3',
      title: '3-year Plan',
      features: [
        'Unlimited repairs due to faults or mishaps',
        'Annual appliance check and deep clean'
      ],
      price: 99,
      label: 'Save £63',
      subLabel: 'vs Monthly Plan'
    },
    {
      id: 'yearly-plan-5',
      title: '5-year Plan',
      features: [
        'Unlimited repairs due to faults or mishaps',
        'Fixed in 7 days or we\'ll replace with new',
        'Annual appliance check and deep clean'
      ],
      price: 129,
      label: 'Save £141',
      subLabel: 'vs Monthly Plan'
    }
  ],
  selectedCard: 'yearly-plan-3'
};

var setState = function(data) {
  initialState.selectedCard = data.selectedCard;
  console.log(data);
};

class CardSelectionTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: props.cards,
      selectedCard: props.selectedCard,
    };

    this.onSelectCard = this.onSelectCard.bind(this);
  }

  onSelectCard(id) {
    this.setState({ selectedCard: id});
  }

  render() {
    return (
      <CardSelection
      cards={this.state.cards}
      onSelectCard={this.onSelectCard}
      selectedCard={this.state.selectedCard} />
    )
  }

}


ReactDOM.render(
  <div className="dc-site-currys">
    <h1>three</h1>
    <CardSelectionTest cards={initialState.cards} selectedCard={initialState.selectedCard} />
    <h1>two</h1>
    <CardSelectionTest cards={initialState.cards.slice(0,2)} selectedCard={initialState.selectedCard} />
    <h1>one</h1>
    <CardSelectionTest cards={initialState.cards.slice(0,1)} selectedCard={initialState.selectedCard} />
  </div>,
  document.getElementById('app')
);
