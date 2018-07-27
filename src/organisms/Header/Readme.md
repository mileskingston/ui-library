```jsx
    const DropdownMenu = require('../DropdownMenu/DropdownMenu').default;
    const menuLinks = require('../../config/menuLinks.js').default;
    const translations = require('../../config/translations').default;

    Object.keys(menuLinks).forEach((key) => {
      const link = menuLinks[key];
      link.label = translations[link.titleTag];
    });

    const dummyFnc = () => {};

    const getSuggestions = (query) => [
        {
            type: 'term',
            title: `${query} term 1`
        },
        {
            type: 'term',
            title: `${query} term 2`
        },
        {
            type: 'term',
            title: `${query} term 3`
        },
        {
            type: 'sayt',
            image: '/products/kettle1.jpg',
            brand: 'Kettle',
            title: `${query} product 1`,
            price: '22.2',
            reviewScore: 10
        },
        {
            type: 'sayt',
            image: '/products/kettle2.jpg',
            brand: 'Kettle',
            title: `${query} product 2`,
            price: '13.45',
            reviewScore: 8
        },
        {
            type: 'sayt',
            image: '/products/kettle3.jpg',
            brand: 'Kettle',
            title: `${query} product 3 with longer title which is really long`,
            price: '48.50',
            reviewScore: 2
        },
        {
            type: 'sayt',
            image: '/products/kettle4.jpg',
            brand: 'Kettle',
            title: `${query} product 4`,
            price: '22.2',
            reviewScore: 7.5
        }
    ];

    const menuItems = [
        {
            className: 'dc-header-item--menu',
            key: 'menu',
            icon: 'Menu',
            label: 'Menu'
        },
        {
            className: 'dc-header-item--search',
            key: 'search',
            icon: 'Search',
            label: 'Search',
            onClick: (e, header) => {
                header.cancelClickHandler = true;
                header.toggleSearchExtended(e);
            }
        },
        {
            className: 'dc-header-item--stores',
            key: 'stores',
            icon: 'Stores',
            label: 'Stores'
        },
        {
            key: 'alerts',
            icon: 'Bell',
            label: 'Alerts',
            badge: {
                count: 13,
                color: '#ee9022'
            }
        },
        {
            render: () => {
                return (
                    <DropdownMenu
                        key="account-menu"
                        icon="User"
                        label="Welcome"
                        additionalClassName="dc-header-item dc-header-dropdown"
                        linkClickHandler={() => {}}
                        links={menuLinks}
                    />
                );
            }
        },
        {
            key: 'basket',
            icon: 'Basket',
            label: 'Basket',
            badge: {
                count: 5,
                color: '#4e8130',
                displayZero: true
            }
        }
    ];
    
    <div className="header-wrapper" style={{ minHeight: 160 }}>
      <Header
        desktopLogoSrc="logo_currys.png"
        handHeldLogoSrc="logo_currys_negative.png"
        toggleSearch={dummyFnc}
        toggleSlide={dummyFnc}
        viewBasket={dummyFnc}
        deviceType="desktop"
        homeURL="/#home"
        menuItems={menuItems}
        menuLinkHandler={()=>console.log('menu')}
        storeFinderURL="/#storefinder"
        basketURL="/#basket"
        accountURL="/#account"
        searchConfiguration={{
            query: '',
            searchAction: '',
            getSuggestions: (q) => setState({ suggestions: getSuggestions(q) }),
            clearSuggestions: () => {},
            suggestions: state.suggestions || []
        }}
      />
    </div>
```
