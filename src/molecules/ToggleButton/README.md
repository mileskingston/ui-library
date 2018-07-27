*Normal and Small Buttons*

    initialState = {
      btn1: {
        active: false  
      },
      btn2: {
        active: true  
      }
    };

    <div className="dc-site-pcworld sg-gutter-bottom">
      <ToggleButton
        active={state.btn1.active}
        onToggle={() => setState({ btn1: { active: !state.btn1.active } })}
        activeBtnContent="Active"
        inActiveBtnContent="In-Active"
      />
      <br/>
      <ToggleButton
        active={state.btn2.active}
        onToggle={() => setState({ btn2: { active: !state.btn2.active } })}
        activeBtnContent="Active (Small)"
        inActiveBtnContent="In-Active (Small)"
        size="small"
      />      
    </div>

*With Active Icon and Custom Active Icon*

    initialState = {
      btn1: {
        active: true  
      },
      btn2: {
        active: true  
      }
    };

    <div className="dc-site-pcworld sg-gutter-bottom">
      <ToggleButton
        active={state.btn1.active}
        onToggle={() => setState({ btn1: { active: !state.btn1.active } })}
        activeBtnContent="Active"
        inActiveBtnContent="In-Active"
        showActiveIcon={true}
      />
      <br/>
      <ToggleButton
        active={state.btn2.active}
        onToggle={() => setState({ btn2: { active: !state.btn2.active } })}
        activeBtnContent="Active"
        inActiveBtnContent="In-Active"
        activeIcon="Heart"
        showActiveIcon={true}
      />      
    </div>
