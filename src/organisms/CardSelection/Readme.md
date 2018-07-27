*Multiple Items*

    initialState = {
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

    <div className="dc-site-currys">
      <CardSelection
        cards={state.cards}
        onSelectCard={(id) => { setState({ selectedCard: id}) }}
        selectedCard={state.selectedCard} />
    </div>

*Single Item*

    initialState = {
      cards: [
        {
          id: 'replacement-plan',
          title: 'Instant Replacement Plan',
          features: [
            'This item is replaced fast, hassle free and at no extra cost to you',
            'Multiple replacements if needed',
            'If it breaks when you\'re abroad, we\'ll replace when you get back'
          ],
          price: 30,
        }
      ],
      selectedCard: 'replacement-plan'
    };

    <div className="dc-site-currys">
      <CardSelection
        cards={state.cards}
        onSelectCard={(id) => { setState({ selectedCard: id}) }}
        selectedCard={state.selectedCard} />
    </div>
