*Tooltip with arrow top and type info - can be closed only by clicking Close button:*
    
        initialState = {
            opened: false
        };
    
        <div className="dc-site-currys">
            <a className="dc-link" onClick={(e) => setState({ opened: !state.opened })} 
            style={!state.opened ? {display: 'block'} : {display: 'none'}}>Open Tooltip</a>
    
            {state.opened &&
                <ClosableTooltip
                    arrow="top"
                    display={state.opened}
                    onCloseButtonClick={() => setState({ opened: false })}
                >
                    <h3>
                        Tooltip which can be closed only by click on top-right close button
                    </h3>
                </ClosableTooltip>
            }
        </div>
        
*Tooltip with arrow left and type warning - can be closed by clicking on Close button and by clicking outside tooltip:*
    
        initialState = {
            opened: false
        };
    
        <div className="dc-site-currys">
            <a className="dc-link" onClick={(e) => setState({ opened: !state.opened })} 
            style={!state.opened ? {display: 'block'} : {display: 'none'}}>Open Tooltip</a>
    
            {state.opened &&
                <ClosableTooltip
                    arrow="left"
                    closeOnClickOutsideEnabled
                    display={state.opened}
                    onCloseButtonClick={() => setState({ opened: false })}
                    onClickOutsideOfTooltip={() => setState({ opened: false })}
                    type="warning"
                >
                    <h3>
                        Tooltip which can be closed by clicking on Close button and by clicking outside tooltip
                    </h3>
                </ClosableTooltip>
            }
        </div>
        
        
*Tooltip with arrow right and type neutral - can be closed by clicking on Close button and by scrolling the page:*
    
        initialState = {
            opened: false
        };
    
        <div className="dc-site-currys">
            <a className="dc-link" onClick={(e) => setState({ opened: !state.opened })} 
            style={!state.opened ? {display: 'block'} : {display: 'none'}}>Open Tooltip</a>
    
            {state.opened &&
                <ClosableTooltip
                    arrow="right"
                    display={state.opened}
                    onCloseButtonClick={() => setState({ opened: false })}
                    onScroll={() => setState({ opened: false })}
                    type="neutral"
                >
                    <h3>
                        Tooltip which can be closed by clicking on Close button and by scrolling the page
                    </h3>
                    
                </ClosableTooltip>
            }
        </div> 
        

*Tooltip with arrow bottom and type positive - can be closed by clicking on Close button, by scrolling the page, and by clicking outside tooltip:*
    
        initialState = {
            opened: false
        };
    
        <div className="dc-site-currys">
            <a className="dc-link" onClick={(e) => setState({ opened: !state.opened })} 
            style={!state.opened ? {display: 'block'} : {display: 'none'}}>Open Tooltip</a>
    
            {state.opened &&
                <ClosableTooltip
                    arrow="bottom"
                    display={state.opened}
                    onCloseButtonClick={() => setState({ opened: false })}
                    onClickOutsideOfTooltip={() => setState({ opened: false })}
                    onScroll={() => setState({ opened: false })}
                    type="positive"
                >
                    <h3>
                        Tooltip which can be closed by clicking on Close button, by scrolling the page, and by clicking outside tooltip
                    </h3>
                    
                </ClosableTooltip>
            }
        </div>        