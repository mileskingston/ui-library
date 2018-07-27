*Product Price Block price only*

    <ProductPriceBlock currentPrice={300} />

*Product Price Block with was and savings price*

    <ProductPriceBlock currentPrice="100" savingsPrice="50" wasPrice="150" />

*Product Price Block with savings price*

    <ProductPriceBlock currentPrice="199" savingsPrice="79" />
    
*Product Price Block with was and savings price - out of stock*
    
    <ProductPriceBlock currentPrice="100" savingsPrice="50" wasPrice="150" outOfStock />
    
*Product Price Block for bundle with all information*
        
    <ProductPriceBlock
     isBundle
     currentPrice="269.00"
     mainProductWasPrice={219.99}
     mainProductWasPriceFrom="04/05/17"
     mainProductWasPriceTo="10/07/17"
     mainProductCurrentPrice="249.99"
     mainProductSaving="39.99"
    />
    
*Product Price Block for bundle without dates*
        
    <ProductPriceBlock
     isBundle
     currentPrice="269.00"
     mainProductWasPrice={219.99}
     mainProductCurrentPrice="249.99"
     mainProductSaving="39.99"
    />
    
*Product Price Block for bundle without dates and main product current price*
            
    <ProductPriceBlock
      isBundle
      currentPrice="249.00"
      mainProductWasPrice={209.99}
      mainProductSaving="29.99"
     />   
    
*Product Price Block for bundle with all information*
        
    <ProductPriceBlock
     isBundle
     currentPrice="329.00"
     mainProductWasPrice={209.99}
     mainProductWasPriceFrom="07/06/17"
     mainProductWasPriceTo="10/08/17"
     mainProductCurrentPrice="219.99"
     mainProductSaving="79.99"
     outOfStock
    />
    
        
*Product Price Block 'compact' style*
        
    <ProductPriceBlock
     style="compact"
     currentPrice="329.00"
     savingsPrice="54.00"
    />

*Product Price Block with Price drop label*
        
    <ProductPriceBlock
      style="compact" 
      currentPrice="329.00"
      savingsPrice="54.00"
      isPriceDropped
    />
