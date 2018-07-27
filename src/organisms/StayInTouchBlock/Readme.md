```jsx noeditor
const Tooltip = require('../../molecules/Tooltip/Tooltip').default;

<Tooltip type="warning">
    This component is not exported by default because of usage of async functions.
    Ensure you have babel <a target="_blank" href="https://babeljs.io/docs/plugins/transform-regenerator/">correctly configured</a> when using this component.
</Tooltip>
```

```jsx
const Popup = require('../Popup/Popup').default;
const List = require('../../molecules/List/List').default;

const Separator = () => (
    <div>
        <hr
            style={{ marginTop: 20, marginBottom: 2 }}
            noshade="noshade"
        />
        <hr
            style={{ marginTop: 2, marginBottom: 20 }}
            noshade="noshade"
        />
    </div>
);

const commonProps = {
    contactChannelGroups: [
        {
          name: 'multipleItemsOn',
          description: 'How should we contact you?',
          providesPopup: true,
          toggleDescription: 'Multiple items, one is selected by default',
          toggleLabelFactory: isOn => (isOn ? 'Yes' : 'No'),
          items: [
            {
              name: 'email',
              label: 'Email',
              isChecked: true
            },
            {
              name: 'text',
              label: 'Text'
            },
            {
              name: 'call',
              label: 'Call'
            }
          ]
        },
        {
          name: 'multipleItemsOff',
          description: 'How should we contact you?',
          toggleDescription: 'Multiple items, none is selected by default',
          toggleLabelFactory: isOn => (isOn ? 'Yes' : 'No'),
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'text',
              label: 'Text'
            },
            {
              name: 'call',
              label: 'Call'
            }
          ]
        },
        {
          name: 'multipleItemsOffWithValidationError',
          description: 'How should we contact you?',
          toggleDescription: 'Multiple items, none is selected by default. Has validation error',
          toggleLabelFactory: isOn => (isOn ? 'Yes' : 'No'),
          hasValidationError: true,
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'text',
              label: 'Text'
            },
            {
              name: 'call',
              label: 'Call'
            }
          ]
        },
        {
          name: 'multipleItemsOffWithError',
          description: 'How should we contact you?',
          toggleDescription: 'Multiple items, none is selected by default. Has (e.g. network) error',
          toggleLabelFactory: isOn => (isOn ? 'Yes' : 'No'),
          errorMessage: 'Sorry, something went wrong. Please try again.',
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'text',
              label: 'Text'
            },
            {
              name: 'call',
              label: 'Call'
            }
          ]
        },
        {
          name: 'singleItem',
          description: 'How should 3rd party contact you?',
          providesPopup: true,
          toggleDescription: 'Single item',
          items: [
            {
              name: 'email',
              label: 'Email',
              checked: true
            }
          ]
        },
        {
          name: 'noItems',
          toggleDescription: 'No items'
        }
    ],
    headerText: 'Staying in touch',
    popupRenderer: (activePopup, closePopup, parentProps, parentState) => {
        switch (activePopup) {
            case 'multipleItemsOn':
                return (
                    <Popup
                        title="Benefits of staying in touch"
                        onClose={closePopup}
                    >
                        <strong>By subscribing to Currys PC World e-marketing, you will receive:</strong>
                        <List items={[
                            'News and information about our latest promotions relating to similar products and services',
                            'Details of how you can enter competitions and prize promotions',
                            'Exclusive invitations to product launches and other exciting events'
                        ]} />
                    </Popup>
                );
            case 'singleItem':
                return (
                    <Popup
                        title="Benefits of receiving 3rd party offers"
                        onClose={closePopup}
                    >
                        <strong>By enabling 3rd party offers, you will receive:</strong>
                        <List items={[
                            'Ads',
                            'Ads',
                            '...and more ads'
                        ]} />
                    </Popup>
                );
            default:
                return null;
        }
    },
    privacyBoxDescription: 'We promise to keep your details safe and secure. We will never sell or misuse your information. You can unsubscribe at any time. To find out more, please see our Privacy Policy.',
    privacyBoxLabel: 'How my personal details are used'
};

<div>
    <StayInTouchBlock
        {...commonProps}
        headerSize="bigger"
    />
    <Separator />
    <StayInTouchBlock
        {...commonProps}
        displayHeader={false}
    />
    <Separator />
    <StayInTouchBlock
        {...commonProps}
        borderStyle="inner"
        displayHeader={false}
    />
    <Separator />
    <StayInTouchBlock
        {...commonProps}
        borderStyle="outer"
        headerSize="smaller"
    />
    <Separator />
    <StayInTouchBlock
        {...commonProps}
        borderStyle="inner"
        headerIcon="Cog"
        headerSize="bigger"
    />
    <Separator />
    <StayInTouchBlock
        {...commonProps}
        borderStyle="outer-heading-bg"
        headerSize="smaller"
    />
</div>
```

Async action on check (throws error, multiple items)

```
    <StayInTouchBlock
        borderStyle="outer-heading-bg"
        headerSize="smaller"
        onCheckboxChanged={() => new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('rejected');
                reject('Error happened.');
            }, 1000);
        })}
        contactChannelGroups={[
            {
                name: 'groupOne',
                items: [
                    {
                        name: 'email',
                        label: 'Email'
                    },
                    {
                        name: 'phone',
                        label: 'Phone'
                    }
                ]
            }
        ]}
    />
```

Async action on check (throws error, single item)

```
    <StayInTouchBlock
        borderStyle="outer-heading-bg"
        headerSize="smaller"
        onCheckboxChanged={() => new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('rejected');
                reject('Error happened.');
            }, 1000);
        })}
        contactChannelGroups={[
            {
                name: 'groupOne',
                items: [
                    {
                        name: 'email',
                        label: 'Email'
                    }
                ]
            }
        ]}
    />
```
