    const menuLinks = require('../../config/menuLinks.js').default;
    const Icon = require('../../molecules/Icon/Icon').default;
    const translations = require('../../config/translations').default;

    Object.keys(menuLinks).forEach((key) => {
      const link = menuLinks[key];
      link.label = translations[link.titleTag];
    });

    <div className="dc-site-currys">
        <DropdownMenu
            isAnimated={false}
            label="Welcome"
            icon="User"
            links={menuLinks}
            linkClickHandler={() => {}}
        />
    </div>
