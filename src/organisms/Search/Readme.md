*Search:*

    initialState ={
      activeItemIndex: -1,
      autosubmit: true,
      ariaLabel: "Search label",
      clearSearch: () => { setState({ activeItemIndex: 0, error: null, searchText: '' })},
      error: null,
      handleMouseLeaveOption: () => {},
      onBlur: () => { setState({ ariaLabel: 'Search label blurred'})},
      onFocus: () => { setState({ ariaLabel: 'Search label focused'})},
      onChange: (value) => {
        setState({
          searchText: value, 
          processing: false 
        });

        if (value === 'error') {
          setState({ 
            error: 'no results',
            searchIcon: true 
          });
        } else if (value.length > 1) {
          setState({
            searchItems: [
              {
                description: 'Some description',
                location: 'Some additional description',
                term: value
              },
              {
                description: 'Another description',
                location: 'Another additional description',
                term: value
              },
              {
                description: 'And another description',
                location: 'And another additional description',
                term: value
              }
            ]
          });
        }
      },
      onKeyDown: () => { },
      onSelection: (selection) => { 
        const text = typeof selection === 'object' ? selection.location : selection;
        
        setState({
          processing: true,
          searchText: text,
          searchHistory: []
        });

        setTimeout(()=>{
          setState({ processing: false });
        }, 2000);
      },
      placeholder: "Search term",
      prefill: 0,
      searchHistory: [],
      searchHistoryLabel: "Previous Searches",
      searchIcon: true,
      searchItems: [],
      searchText: '',
      setActiveItem: (index) => {
        setState({ activeItemIndex: index });
      },
      processing: false
    };
    
    <div className="dc-site-currys">
      <Search 
        activeItemIndex={state.activeItemIndex}
        autosubmit={state.autosubmit}
        ariaLabel={state.ariaLabel}
        clearSearch={state.clearSearch}
        error={state.error}
        onBlur={state.onBlur}
        onChange={state.onChange}
        onFocus={state.onFocus}
        onSelection={state.onSelection}
        placeholder={state.placeholder}
        prefill={state.prefill}
        searchHistory={state.searchHistory}
        searchHistoryLabel={state.searchHistoryLabel}
        searchIcon={state.searchIcon}
        searchItems={state.searchItems}
        searchText={state.searchText}
        setActiveItem={state.setActiveItem}
        processing={state.processing}
      />
    </div>
    