Not displayed (all items displayed):
```jsx
<ItemsPerPage
    itemsCount={20}
    options={[20, 30, 50]}
    activeOption={20}
/>
```

Display 20 and "All" (30):
```jsx
<ItemsPerPage
    itemsCount={30}
    options={[20, 30, 50]}
    activeOption={20}
/>
```

Display 20, 30 and "All" (50):
```jsx
const initialState = {
    activeOption: 20
};

<ItemsPerPage
    itemsCount={50}
    options={[20, 30, 50]}
    activeOption={state.activeOption}
    onOptionSelected={(option) => {
        setState({ activeOption: option });
    }}
/>
```

Display 20, 30, 50:
```jsx

const initialState = {
    activeOption: 30
};

<ItemsPerPage
    itemsCount={233}
    options={[20, 30, 50]}
    activeOption={state.activeOption}
    onOptionSelected={(option) => {
        setState({ activeOption: option });
    }}
/>
```
