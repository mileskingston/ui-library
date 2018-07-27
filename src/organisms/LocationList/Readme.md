```jsx
  const { DateTime } = require('luxon');
  const { timeZone } = require('../../config/regionalSettings').default;

  this.currentDate = DateTime.fromObject({
    year: 2018,
    month: 2,
    day: 5,
    hour: 8,
    minute: 50,
    millisecond: 0,
    zone: timeZone
  });

  function getDay(index) {
    return this.currentDate
      .plus({ days: index })
      .toFormat('yyyy-MM-dd');
  }

  this.activeItemId = 783;

  this.mobileButtonLabels = {
    more : 'See more stores',
    less : 'See less stores'
  };

  this.storeTitles = [
    'Your nearest store',
    'Stores nearby'
  ];

  this.locations = [
    {
      "id": 123,
      "lat": 52.919946,
      "lng": -1.505106,
      "boxContent": "<h3>Currys PC World featuring Carphone Warehouse Derby</h3><p>Unit A Meteor Centre, Wheatcroft Way <br> Derby, DE21 4RY</p>",
      "name": "Currys PC World featuring Carphone Warehouse Derby",
      "address": "The Light shopping center, Leeds, LS2 5RF",
      "description": "Currys PC World featuring Carphone Warehouse",
      "distance": {
        value: 1.6,
        unit: 'M'
      },
      "distanceLabel": "1.6 miles away",
      "openingHours": [{ "date": getDay(0), "from": "06:00", "to": "21:00", }],
      "facilities": "some facilities"
    },
    {
      "id": 546,
      "lat": 51.919946,
      "lng": -2.505106,
      "boxContent": "<h3>Currys PC World featuring Carphone Warehouse Derby</h3><p>Unit A Meteor Centre, Wheatcroft Way <br> Derby, DE21 4RY</p>",
      "name": "Currys PC World featuring Carphone Warehouse Derby",
      "address": "Unit A Meteor Centre, Wheatcroft Way Derby, DE21 4RY",
      "description": "Currys PC World featuring Carphone Warehouse",
      "distance": {
        value: 1.6,
        unit: 'M'
      },
      "distanceLabel": "1.6 miles away",
      "openingHours": [{ "date": getDay(0), "from": "15:00", "to": "21:00", }],
      "facilities": "some facilities"
    },
    {
      "id": 783,
      "lat": 53.919946,
      "lng": -1.505106,
      "boxContent": "<h3>Currys PC World featuring Carphone Warehouse Derby</h3><p>Unit A Meteor Centre, Wheatcroft Way <br> Derby, DE21 4RY</p>",
      "name": "Currys PC World featuring Carphone Warehouse Derby",
      "address": "Unit A Meteor Centre, Wheatcroft Way Derby, DE21 4RY",
      "description": "Currys PC World featuring Carphone Warehouse",
      "distance": {
        value: 1.6,
        unit: 'M'
      },
      "distanceLabel": "1.6 miles away",
      "openingHours": [{ "date": getDay(0), "from": "15:00", "to": "21:00", }],
      "facilities": "some facilities"
    },
    {
      "id": 451,
      "lat": 51.919946,
      "lng": -2.505106,
      "boxContent": "<h3>Currys PC World featuring Carphone Warehouse Derby</h3><p>Unit A Meteor Centre, Wheatcroft Way <br> Derby, DE21 4RY</p>",
      "name": "Currys PC World featuring Carphone Warehouse Derby",
      "address": "Unit A Meteor Centre, Wheatcroft Way Derby, DE21 4RY",
      "description": "Currys PC World featuring Carphone Warehouse",
      "distance": {
        value: 0.6,
        unit: 'M'
      },
      "openingHours": [{ "date": getDay(0), "from": "12:00", "to": "21:00", }],
      "facilities": "some facilities"
    },
    {
      "id": 987,
      "lat": 53.919946,
      "lng": -1.505106,
      "boxContent": "<h3>Currys PC World featuring Carphone Warehouse Derby</h3><p>Unit A Meteor Centre, Wheatcroft Way <br> Derby, DE21 4RY</p>",
      "name": "Currys PC World featuring Carphone Warehouse Derby",
      "address": "Unit A Meteor Centre, Wheatcroft Way Derby, DE21 4RY",
      "description": "Currys PC World featuring Carphone Warehouse",
      "distance": {
        value: 1,
        unit: 'M'
      },
      "openingHours": [{ "date": getDay(0), "from": "07:00", "to": "21:00", }],
      "facilities": "some facilities"
    }
  ];

<LocationList
    locations={this.locations}
    mobileButtonLabels={this.mobileButtonLabels}
    storeTitles={this.storeTitles}
    activeItemId={this.activeItemId}
    currentDate={this.currentDate}
    timeZone={timeZone}
>
</LocationList>
```
