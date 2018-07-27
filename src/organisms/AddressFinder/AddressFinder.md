```jsx
const FormSimple = require('../FormSimple/FormSimple').default;
const FormItem = require('../FormItem/FormItem').default;
const FormSubmit = require('../FormSubmit/FormSubmit').default;

<div className="dc-site-currys" style={{ maxWidth: 400 }}>
    <FormSimple>
        <div className="dc-form-row">
            <AddressFinder
                postCode="SP10 2AA"
                label="Postcode"
                hint="Please enter a valid UK postcode (i.e AA1A 1AA)."
                errorMessage="Please enter a valid UK postcode (i.e AA1A 1AA)."
                autofillFields={{
                    address1: 'street',
                    address2: 'streetAlt',
                    city: 'city',
                    county: 'county'
                }}
            />
        </div>
        
        <div className="dc-form-row">
            <FormItem name="address1" label="Address 1" />
        </div>
        <div className="dc-form-row">
            <FormItem name="address2" label="Address 2" />
        </div>
        <div className="dc-form-row">
            <FormItem name="city" label="City" />
        </div>
        <div className="dc-form-row">
            <FormItem name="county" label="County" />
        </div>
        <div className="dc-form-row">
            <FormSubmit name="submit" label="Submit" />
        </div>
    </FormSimple>
</div>
```
