*Tooltip for bundle product*
     
     const subItemNames = [
                   "ASUS K31ADE Desktop PC",
                   "SAMSUNG LS24D590 Full HD 23.6\" LED Monitor",
                   "3Dfx Interactive Voodoo"
                ];


    <ComparePanelProductTooltip 
        display
        imageAlt="ASUS K31ADE Desktop PC"
        imageUrl="http://brain-images.cdn.dixons.com/0/0/10139000/g_10139000.jpg"
        productUrl="http://vasikm01.fo-currys.fo.dev.dixons.com/gbuk/computing/desktop-pcs/desktop-pcs/asus-k31ade-desktop-pc-full-hd-led-monitor-bundle-10139000-pdt.html"
        productName="K31ADE Desktop PC & Full HD LED Monitor Bundle"
        currentPrice="260.00"
        manufacturer="ASUS"
        isBundle
        onEmailMeBackLinkClicked={(e) => {
           e.stopPropagation();
           e.preventDefault();
        }}
        savingsPrice={null}
        mainProductSaving="398.98"
        separateSellingPrice="529.98"
        subItemNames={subItemNames}
        mainProductCurrentPrice="379.99"
        mainProductWasPrice="429.99"
        mainProductWasPriceFrom="25/05/17"
        mainProductWasPriceTo="10/07/17"
        outOfStock
    />