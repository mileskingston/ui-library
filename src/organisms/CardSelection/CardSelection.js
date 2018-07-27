import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../../molecules/Card/Card';
import List from '../../molecules/List/List';
import PriceBlock from '../../molecules/PriceBlock/PriceBlock';
import Label from '../../molecules/Label/Label';
import ToggleButton from '../../molecules/ToggleButton/ToggleButton';

import './CardSelection.styl';

class CardSelection extends Component {
  constructor(props) {
    super(props);
    this.onSelectCard = this.onSelectCard.bind(this);
  }

  onSelectCard({ id, isActive }) {
    const selectedPlanId = isActive ? '' : id;
    this.props.onSelectCard(selectedPlanId);
  }

  renderCard(card) {
    const {
      id, title, features, price, priceInfo, label, subLabel
    } = card;
    const { selectedCard } = this.props;
    const isActive = !!(id === selectedCard);
    const isActiveClass = isActive ? 'dc-card-selection__card--active' : '';
    let currency = 'GBP';
    let priceAmount = price;
    if (typeof price === 'object') {
      // eslint-disable-next-line prefer-destructuring
      currency = price.currency;
      priceAmount = price.amount;
    }
    return (
      <div key={id} className={`dc-card-selection__card ${isActiveClass}`}>
        <Card title={title}>
          <div className="dc-card-selection__col1">
            <div className="dc-card-selection__features">
              <List items={features} />
            </div>
          </div>
          <div className="dc-card-selection__col2">
            <div className="dc-card-selection__price-block">
              <PriceBlock price={priceAmount} info={priceInfo} currency={currency} />
            </div>
            {label &&
              <div className="dc-card-selection__label">
                <Label title={label} subTitle={subLabel} />
              </div>}
            <div className="dc-card-selection__add-btn">
              <ToggleButton
                active={isActive}
                onToggle={() => {
                  this.onSelectCard({ id, isActive });
                }}
                activeBtnContent="Remove"
                inActiveBtnContent="Add"
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  render() {
    const { cards } = this.props;
    let classes = [];

    if (this.props.classes) {
      classes = this.props.classes.split(' ');
    }

    classes.push('dc-card-selection');
    classes.push(`dc-card-selection__card-count-${cards.length}`);

    return (
      <div data-component="CardSelection" className={classes.join(' ')}>
        {cards.map(card => this.renderCard(card))}
      </div>
    );
  }
}

CardSelection.displayName = 'CardSelection';

CardSelection.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      features: PropTypes.arrayOf(PropTypes.string),
      id: PropTypes.string,
      price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object
      ]),
      priceInfo: PropTypes.string,
      label: PropTypes.string,
      subLabel: PropTypes.string
    })
  ).isRequired,
  classes: PropTypes.string,
  onSelectCard: PropTypes.func.isRequired,
  selectedCard: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string
};

CardSelection.defaultProps = {
  classes: '',
  selectedCard: undefined,
  label: '',
  subLabel: ''
};

export default CardSelection;
