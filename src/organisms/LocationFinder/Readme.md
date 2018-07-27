*Location Finder:*
  
    initialState = {
      breakpoint: 'desktop',
      clearLocation: () => {
        const location = Object.assign({}, state.location, {
          activeItemIndex: 0,
          error: null,
          searchText: ''
        });

        setState({ location });
      },
      error: null,
      geolocate: () => {
        const location = Object.assign({}, state.location, {
          activeItemIndex: 0,
          searchText: 'Current Location'
        });

        setState({ location, processing: true });

        setTimeout(() => {
          setState({ processing: false})
        }, 2000);
      },
      processing: false,
      loadLocationFinder: () => {},
      location: {
        activeItemIndex: -1,
        prefill: 0,
        searchHistory: [],
        searchIcon: true,
        searchItems: [],
        searchText: ''
      },
      locationSet: false,
      onSearchTextChange: (value) => {
        const searchItems =  [
          { 
            description: 'Some location',
            location: 'Some location description',
            term: value
          },
          {
            description: 'Another location',
            location: 'Another location description',
            term: value
          },
          {
            description: 'And another location',
            location: 'And another location description',
            term: value
          }
        ];

        const location = Object.assign({}, state.location, {
          error: value === 'error' ? 'no results' : null,
          searchText: value,
          searchItems: value !== 'error' && value.length > 1 ? searchItems : []
        });

        setState({ location });
      },
      onLocationSelection: (selectedItem) => {
        const text = typeof selectedItem === 'object' ? selectedItem.location : text;

        const location = Object.assign({}, state.location, {
          error: null,
          searchText: text
        });

        setState({ location, locationSet: true, processing: true });

        setTimeout(() => {
          setState({ processing: false})
        }, 2500);
      },
      setActiveLocationItem: (index) => {
        const searchItems = [
          { 
            description: 'Some location',
            location: 'Some location description',
            term: 'location'
          },
          {
            description: 'Another location',
            location: 'Another location description',
            term: 'location'
          },
          {
            description: 'And another location',
            location: 'And another location description',
            term: 'location'
          }
        ];

        const location = Object.assign({}, state.location, { 
          activeItemIndex: index,
          searchItems: index > -1 ? searchItems : []
        });
        setState({ location });
      },
      translations: {
        currentLocationLabel: 'Use current location',
        locationPlaceholder: 'Enter location',
        searchHistoryLabel: 'Previous searches'
      }
    };

    <div className="dc-site-currys">
      <LocationFinder 
        breakpoint={state.breakpoint}
        clearLocation={state.clearLocation}
        error={state.error}
        geolocate={state.geolocate}
        processing={state.processing}
        loadLocationFinder={state.loadLocationFinder}
        location={state.location}
        locationSet={state.locationSet}
        onSearchTextChange={state.onSearchTextChange}
        onLocationSelection={state.onLocationSelection}
        setActiveLocationItem={state.setActiveLocationItem}
        translations={state.translations}
      />
    </div>
