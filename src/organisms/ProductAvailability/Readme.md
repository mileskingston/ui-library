**Delivery and collection available**
    
```jsx
<ProductAvailability
    location="SP10 2AA"
    collection={{
        available: true,
        label: 'Yes, you can collect today, 1 mile away'
    }}
    delivery={{
        available: true,
        label: 'Yes, we can deliver Mon 18th Sept - FASTEST & FREE' 
    }}
/>
```

**Delivery and collection not available**
    
```jsx
<ProductAvailability
    location="SP10 2AA"
    collection={{
        available: false,
        label: 'Delivery not available'
    }}
    delivery={{
        available: false,
        label: 'Collection not available' 
    }}
/>
```

**In progress**
    
```jsx
<ProductAvailability
    inProgress
    location="SP10 2AA"
    collection={{
        available: false,
        label: 'Delivery not available'
    }}
    delivery={{
        available: false,
        label: 'Collection not available' 
    }}
/>
```
