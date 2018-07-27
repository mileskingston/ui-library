
```jsx
  require('./style.mock.styl');
  const FixedContent = require('./FixedContent/FixedContent').default;
  const SlidingContent = require('./SlidingContent/SlidingContent').default;
  const ToggleButton = require('../../molecules/ToggleButton/ToggleButton').default;

  function toggleSlide() {
    setState({
      sliding: !state.sliding
    })
  }
  
  <div>
    <SlideWrapper sliding={state.sliding}>
      <FixedContent>
        panel
      </FixedContent>
      <SlidingContent onOverlayClick={toggleSlide}>
        content
      </SlidingContent>
    </SlideWrapper>
    <br />
    <ToggleButton
        active={state.sliding}
        onToggle={toggleSlide}
        activeBtnContent="Close panel"
        inActiveBtnContent="Open panel"
      />
  </div>
```
