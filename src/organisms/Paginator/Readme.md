Paginator component does not use internal state. 
If you want to update pageList (for example changing current page), you need to pass updated pagesList into this component.

    let pagesList = [
        {
            "url": "http://link-1.co.uk",
            "label": 1,
            "isCurrent": false
        }, {
            "url": "http://link-2.co.uk",
            "label": 2,
            "isCurrent": true
        }, {
            "url": "http://link-3.co.uk",
            "label": 3,
            "isCurrent": false
        }, {
            "url": "http://link-4.co.uk",
            "label": 4,
            "isCurrent": false
        }, {
            "url": "http://link-5.co.uk",
            "label": 5,
            "isCurrent": false
        } 
    ];
    
    const onClickHandler = (pageUrl, pageLabel) => {
        alert(`Clicked on URL: "${pageUrl}" with label: "${pageLabel}"`);
    }

    <div className="dc-site-currys">
        <Paginator 
            pagesList={pagesList}
            onLinkClick={onClickHandler} 
        />
    </div>