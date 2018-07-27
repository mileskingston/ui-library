**ClosableTag with text content**

```jsx
<ClosableTag onCloseClick={()=>{alert('Close button clicked!');}}>
    HOTPOINT
</ClosableTag>
```

**ClosableTag with React component as content**

```jsx
<ClosableTag 
    onCloseClick={()=>{alert('Close button clicked!');}}
    closeButtonTooltipText="Click to do some action"
>
    <Rating
        icon={<Icon icon="Star" />}
        maxCount={5}
        ratingCount={15}
        ratingValue={3.5}
    />
</ClosableTag>
```