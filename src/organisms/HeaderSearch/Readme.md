```jsx
    require('./style.mock.styl');

    const dummyFnc = () => {};
    const results = [
      {
       title: "whatever you search",
        type: "term",
        url: "https://secure.currys.co.uk/gbuk/household-appliances/small-kitchen-appliances/toasters/russell-hobbs-windsor-22831-4-slice-toaster-red-10135899-pdt.html"
      },
      {
        brand: "Russell",
        image: "https://brain-images-ssl.cdn.dixons.com/9/9/10135899/s_10135899.jpg",
        price: "29.99",
        title: "RUSSELL HOBBS Windsor 22831 4-Slice Toaster - Red",
        type: "sayt",
        reviewScore: "4",
        url: "https://secure.currys.co.uk/gbuk/household-appliances/small-kitchen-appliances/toasters/russell-hobbs-windsor-22831-4-slice-toaster-red-10135899-pdt.html"
      }
      
    ];
    
    <div className="header-search-wrapper">
      <HeaderSearch
        clearResults={() => {}}
        results={results}
        searchAction=''
      />
    </div>

```
