**Unreleased**

Add unreleased changes here. Move items from this section to correct version section.

New features

- Ribbon - label with text
- Carousel - basic slideshow with navigational dots and drag support on touch devices.

Code changes

- OpeningHours - typecheck for openingHours input
- LocationList, LocationListItem - add opening hours
- Store Finder Search Bar & Filters: styling for browsers that dont support flexbox.

Other changes



---

**2.14.0**

New features

- Ribbon - label with text
- Carousel - basic slideshow with navigational dots and drag support on touch devices.

Code changes

- Loader - add configuration for alignment and size



**2.13.14**

Code changes

- Sticky
    - add event when stickiness changes
    - make it possible to disable sticky effect of component
- Loader - add configuration for alignment and size 

Other changes

- Babel: use babel-preset-env instead of deprecated es2015
- Color fixes (bold text color, titles color)
- Documentation update



**2.13.13**

Code changes

- SortBy - changed z-indexes to fit styles in listing page



**2.13.12**

Code changes

- Search
    - blur search input before onSelection handler to make it possible to focus search input again
    - add public method `displaySuggestions` to toggle suggestions visibility
- LocationFinder
    - add possibility to get reference to Search child component



**2.13.11**

Code changes

- ProductSwatches - swatch image and tooltip image - IE fix to keep aspect ratio and width/height.
- ViewSwitch - changed styles to align designs in IE9



**2.13.10**

Code changes

- ProductBlock - fix OOS price color



**2.13.9**

Code changes

- Button, Checkbox, Input, Link - add data-qa parameter support



**2.13.8**

Code changes

- ProductSwatches - style changes for mobile and table devices. Tooltip in swatches style changes.

Other changes

- BackstopJS setup - easy css regression testing for components 🏙



**2.13.7**

Other changes

- Migrated to Jest 🎉
- Run tests before commit 👀



**2.13.6**

Code changes

- Notification
    - fix passing of style property to Tooltip

- LocationFinder
    - pass texts as props
    - add property to enable/disable geoLocation
    - request geolocation permission in LocationFinder
    - add support for displaying input validation errors
    - add possibility to listen on focus changes
    - pass inputRenderer to Search component

- StoreFinderSearchBar
    - add property to enable/disable geoLocation
    - request geolocation permission in LocationFinder

- Location helper
    - add possibility to load place details by address
    - reject promises in case of errors
    - add possibility to specify types for autocomplete
    - add possibility to get place details by location

- Search
    - remove timeout when clearing the field to avoid label jumping
    - avoid calling setState on unmounted component
    - support custom input renderer

- SearchInput
    - add special css class when input is empty
    - avoid calling setState on unmounted component

- ProductAvailability
    - show spinner when fetching data is in progress
    - allow single item
    - styles changes
    - fixed stylint errors

- SimilarProductBlock
    - add 'interaction' attribute for analytics

- Loader
    - show spinner when fetching data is in progress

- Atoms
    - change dc-base-font color

- Input
    - pass event together with value
    - support putting ref on input element
    - support listening onKeyDown event

- Sticky
    - increase z-index

- ProductBlock
    - fix OOS price color

Other changes

- Config: add My Account Item availability endpoint



**2.13.5**

Code changes

- ViewSwitch - changed color of button's icons
- Select
    - bugfix, when a disabled item is clicked, the disable item is not selected now
    - buxfix, when clear button is clicked, the focus from Select component is removed



**2.13.4**

Code changes

- SortBy - IE9 style fallback
- ViewSwitch - IE9 style fallback
- ViewSwitch - bugfix in handleClick method, added missing variable event



**2.13.3**

Code changes

- SimilarProductBlock - add 'interaction' attribute for analytics
- SortBy - corrected in order to support IE9
- Select - added more specific PropTypes for 'options' prop, changed order of methods in order to fulfill eslint



**2.13.2**

Code changes

- ProductSwatches - style (width of ProductSwatch) and behavior (removing onHover on blue "i" icon) changes according to business requests.



**2.13.1**

Code changes

- ProductSwatches - help tooltip bugfix and css positioning



**2.13.0**

New features

- SortBy - select dropdown component for the listing page.

Code changes

- ProductSwatches - bunch of bugfixes



**2.12.1**

Code changes

- AddressFinder - set form to be possible to submit after postcode is updated



**2.12.0**

New features

- StoreFinderFilters - component to allow users to filter stores by services and facilities.
- ProductAvailability - components displays block with delivery and collection information.
- ItemsViewedPerPage
- Helpers - added location helpers:
    - autocompleteLocations
    - getPlaceDetails

Code changes

- ProductSwatches
    - Fix bug - bind onSwatchMouseOut to this context
    - Add support to show swatch value under swatch image
    - Implementation of closable tooltip (swatch help text)
    - Tests
- ProductSwatchesMultiple
    - Style changes
    - Tests
- ProductSwatchTooltip
    - Style changes
    - Tests
- ComparePanel
    - Bug fix - right border of tooltip wasn't displaying on firefox
- AddressFinder
    - Prevent double submit
- ProductAvailability
    - Fix icon height
- ProductBlock
    - Add unit tests
- Button, FormSubmit
    - add `focus` public method
- FormItem, Input
    - add possibility to listen user input (browser autocomplete excluded)

Other changes

- Setup Google Maps API
- Various fixes in test suite



**2.11.2**

Code changes

Reverted QuickAccount part of 2.11.1



**2.11.1** (DO NOT USE IN PRODUCTION! - USE 2.11.2)

Code changes

- ComparePanel - bug fix - right border of tooltip wasn't displaying on firefox
- Button, FormSubmit - add `focus` public method
- EmailRecognition
    - add autoFocus prop
    - trigger recognition immediately when user didn't typed anything manually
- FormItem, Input - add possibility to listen user input (browser autocomplete excluded)
- QuickAccount
    - autofocus email recognintion field on email recognition step
    - autofocus password field on registration step
    - autofocus submit button when browser automatically completed login details
    - do not clear password when browser filled the login form
    - allow browser to autocomplete the login form by hiding it by CSS

Other changes

- Added simple mock server to support fake API calls inside of styleguidist



**2.11.0**

New features

- ProductPriceBlock - new component showing price of product with discounts and other info
- LazyLoadedImages - new component for loading images lazy with Loader

Code changes

- ComparePanelProductTooltip - implementation finished of this component
- ComparePanel - added new functionality in order to support ComparePanelProductTooltip
- ComparePanelProduct - moved some functionality from this component to ComparePanel
- Tooltip - added new possible value `no-margin` of component's property `style`
- Icon - added new icon PlusCircle
- PriceBlock - style refactored
- ClosableTooltip - refactored, removed React anti-patterns
- ComparePanelProductImage - this component was removed and its functionality
was moved to new more general component LazyLoadedImage
- /helpers/formatPrice.js - added new functionality to this function



**2.10.6**

Code changes

- QuickAccount, ResetPassword - fix quick account submit data

Other changes

- add ui-library version into global variable



**2.10.5**

Code changes

Reverted 2.10.2



**2.10.4**

Code changes

- AddressFinder, FormItem - AddressFinder refactoring and making it reusable
- FormSimple - add pre-submit hook
- network - possibility to pass valid HTTP statuses to ajax call

Other changes

- mock data loading in styleguide



**2.10.3**

Code changes

- ViewSwitch - use props for texts instead of translations



**2.10.2** (DO NOT USE IN PRODUCTION! - USE 2.10.5)

Code changes

- Button, FormSubmit - add `focus` public method
- EmailRecognition
    - add autoFocus prop
    - trigger recognition immediately when user didn't typed anything manually
- FormItem, Input - add possibility to listen user input (browser autocomplete excluded)
- QuickAccount
    - autofocus email recognintion field on email recognition step
    - autofocus password field on registration step
    - autofocus submit button when browser automatically completed login details
    - do not clear password when browser filled the login form
    - allow browser to autocomplete the login form by hiding it by CSS



**2.10.1**

Code changes

- AdaptiveLayout - multiple fixes

Other changes

- Added missing cookie-js dependency of ViewSwitch component



**2.10.0**

New features

- ProductSwatchesMultiple - new component. Container to render multiple ProductSwatches components.
- ProductSwatches - new component. Renders product swatches for single attribute. For example swatches for colors, for capacity, etc.
- ProductSwatchTooltip - new component. Wrapper for Tooltip component. Renders product variant info when hovering ProductSwatches list item.
- ViewSwitch

Code changes

- Button - added button style "none"



**2.9.2**

Other changes

- removed old MegaMenu component export



**2.9.1**

Code changes

- Helpers
    - fixed functionality when `window` is not available (SSR)
    - improved reliability of `supportsTouch` function
- LocationListItem - improved styling

Other changes

- generate source maps
- remove lib folder before build:lib command



**2.9.0**

New features

- Helpers - added "browser" helper (moved from fo-my-account-ui)
- SlideWrapper

Code changes

- Map - improved passing of props to GoogleMap component by using spread operator
- MegaMenu
    - moved from new checkout project "as-is" (will be refactored later)
    - added mobile version of MegaMenu
- QuickAccount - fixed UI bug with input caret on iOS 11+ (https://bugs.webkit.org/show_bug.cgi?id=176896)
- StoreFinderSearchBar - added missing export

Other changes

- fixed failing tests



**2.8.3**

Code changes

- ComparePanel - improved spacing



**2.8.2**

Code changes

- ComparePanelProductTooltip - removed styles causing huge images



**2.8.1**

Code changes

- LocationListItem - fixed import statements



**2.8.0**

New features

- ClosableTooltip - it's a tooltip with close button in top-right corner

Code changes

- ProductBlock
    - style fixes
- SimilarProductBlock
    - link product image to product page
    - do not escape HTML in product title and product attributes
- Close - added label to Close component, no breaking change according to 2.7.0
- Tooltip - added new value ('neutral') to prop called type, no breaking change according to 2.7.0



**2.7.1**

Code changes

- QuickAccount - remove "new-password" autocomplete from login form
- LocationList
    - fixed missing exports
    - fixed typo in "adress"
- Heading
    - fixed propTypes - babel does not handle static class properties yet



**2.7.0**

New features

- ComparePanelProductImage

Code changes

- ComparePanelProduct - product block for ComparePanel seperated from ProductBlock
- QuickAccount - remove "new-password" autocomplete from login form



**2.6.6**

Code changes

- ContentBlocks - fixed missing exports

Other changes

- Code preparations for server-side rendering 👏🏻



**2.6.5**

Code changes

- ProductBlock - use price instead of previousPrice when detecting price drop



**2.6.4**

Code changes

- ComparePanel - added prop onPopupDisplay
- SimilarProducts - apply smaller flex basis for small-width viewports
- StoreFinderSearchBar
    - added location changing feature
    - minor styles changes



**2.6.3**

Code changes

- ProductBlock, QuickAccount - fix image and styles in ProductBlock component
- ComparePanel - fix functionality (when user click on remove in compare panel)
- LocationListItem - edit svg icon format (react friendly), refactor handlers function check



**2.6.2**

Code changes

- ProductBlock - improve backward compatibility

Other changes

- StoreFinder - updated examples



**2.6.1**

Code changes

- SimilarProductBlock - fallback to 0 reviews and 0 rating when no rating and reviews are received



**2.6.0**

New features

- ComparePanelProductTooltip - a new component used as a tooltip for ComparePanel component. It's still under development.
- SearchInput - component to display search input
- SearchList - component to display search suggestions
- Search - component to integrate SearchInput + SearchList
- LocationFinder - component to search for a location
- StoreFinderSearchBar - component to search and filter stores

Code changes

- Tooltip - prop "small" is now deprecated. New prop "style" with two possible values <"small", "compact">.
- Input - Support to pass "id" by props. This feature is required when using array input name.
- Button - calling tooltip component with style prop (with "small" value) instead of small prop.
- SimilarProducts - reset list of items when fetching data



**2.5.1**

Code changes

- ComparePanel - fixed scope of `compareItems` prop
- ProductBlock - accept also number as `price` and `savePrice`

Other changes

- SimilarProductBlock - fixed props in example file



**2.5.0**

New features

- SimilarProducts - component to load products from RichRelevance service
- SimilarProductBlock - single product item renderer



**2.4.18**

Code changes

- ComparePanel - remove buttons updated to prop values



**2.4.17**

Code changes

- ComparePanel - added ProductBlock, added remove label as prop
- ProductBlock - updated ProductBlock type "compare"



**2.4.16**

Code changes

- ComparePanel - remove styles that breaks wishlists in My Account
- ProductBlock - add data-interaction attribute to reviews link



**2.4.15**

Code changes

- Sticky - fix export



**2.4.14**

Code changes

- QuickAccount - hide Price Drop feature if constant is false in settings
- Sticky - added hideOnScrollUp
    - on scroll up the sticky bar will hide
    - once the user has stopped scrolling the sticky bar will re-appear
- ComparePanel - style linting



**2.4.13**

Code changes

- QuickAccount, EmailRecognition
	- prevent form submit while email recognition is in progress
	- untick price drop checkbox after email recognition finishes



**2.4.12**

New features

- ComparePanel component

Code changes

- Button - added type 'link'



**2.4.11**

Code changes

- siteSkin - Add light version of themed background class
- Checkbox - added support for attributes disabled, value, name



**2.4.10**

Code changes

- Tooltip, Accordion, Notification, QuickAccount, Tabs - clean Tooltip styles



**2.4.9**

Code changes

- ProductBlock - localize price drop label



**2.4.8**

Code changes

- ProductBlock - viewPriceDrop prop added



**2.4.7**

Code changes

- ProductBlock - fix price drop condition
- CardSelection - minor CSS tweaks for care plan card spacing



**2.4.6**

Code changes

- Select, Table, Filter - modifications for filters



**2.4.5**

Code changes

- ProductBlock - add price drop tag
- QuickAccount - send information about price drop checkbox state
- Icons - add PriceTag icon

Code changes

- Sticky - fixed setting of offset when sticky title is on top of screen

**2.4.2**

Code changes

- QuickAccount - do not check price drop checkbox by default



**2.4.1**

Code changes

- ShareProductPanel
	- removed `#remove` and `#share` hashes from links which was causing change of route and re-rendering of whole application



**2.4.0**

New features

- CardSelection component

Code changes

- Checkbox - add small variant of component
- Label - improved styling
- List - improved styling
- OnOffSwitch - add possibility to customize active color
- ToggleButton
	- changed appearance [possible visual BC break]
	- changed default value of `showActiveIcon` to `false` [possible BC break]
- QuickAccount - add price drop notification opt-in checkbox



**2.3.1**

Code changes

- CSS bugs fixes
    - remove different font size for touch devices
    - fix input box-shadow
    - fix padding of tooltips
    - fix font size of list items in Quick Account
    - fix tick color in Quick Account
    - fix input label visual padding
    - disable shrinking of step number



**2.3.0**

New features

- ToggleButton component

Code changes

- Fixed functionality of sticky titles - HW acceleration disabled

Other changes

- react-styleguidist upgraded to version 6



**2.2.0**

New features

- Notification component

Code changes

- OnOfSwitch - decreased margin between control and description

Other changes

- added this CHANGELOG 🎉
