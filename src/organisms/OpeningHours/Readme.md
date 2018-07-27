```jsx
const { DateTime } = require('luxon');
const { timeZone } = require('../../config/regionalSettings').default;

this.currentDate = DateTime.fromObject({
  year: 2017,
  month: 10,
  day: 13,
  hour: 12,
  minute: 0,
  zone: timeZone
});

this.standardOpeningHours = [
  { date: getDay(0), from: '09:00', to: '21:00', },
  { date: getDay(1), from: '09:00', to: '21:00', label: 'Lore ipsum' },
  { date: getDay(2), from: '00:00', to: '00:00', label: 'Bank holidays' },
  { date: getDay(3), from: '00:00', to: '00:00' },
  { date: getDay(4), from: '09:00', to: '21:00' },
  { date: getDay(5), from: '09:00', to: '21:00' },
  { date: getDay(6), from: '09:00', to: '21:00' }
];

this.openingHoursSingleDay = [
  { date: '2017-10-13', from: '09:00', to: '21:00', label: 'Bank holidays' }
];

this.withoutCuttOffTimeDate = this.currentDate.set({
  hour: 8,
  minute: 55
}).setZone(timeZone);


function getDay(index) {
  const date = this.currentDate.plus({ days: index });
  return date.toFormat('yyyy-MM-dd');
}

function format(number) {
    if(number < 10) {
        return '0' + number;
    }
    return number;
}

<div>
  <OpeningHours
    currentDate={DateTime.fromObject({ year: 2017, month: 10, day: 13, hour: 8, minute: 50, zone: timeZone })}
    openingHours={this.standardOpeningHours}
    showCuttOffTime={true}
  />
  <hr size="1" color="#cccccc" />
  <OpeningHours
    currentDate={DateTime.fromObject({ year: 2017, month: 10, day: 13, hour: 11, minute: 0, zone: timeZone })}
    openingHours={this.standardOpeningHours}
    showCuttOffTime={true}
  />
  <hr size="1" color="#cccccc" />
  <OpeningHours
    currentDate={DateTime.fromObject({ year: 2017, month: 10, day: 13, hour: 20, minute: 50, zone: timeZone })}
    openingHours={this.standardOpeningHours}
    showCuttOffTime={true}
  />
  <hr size="1" color="#cccccc" />
  <OpeningHours
    currentDate={DateTime.fromObject({ year: 2017, month: 10, day: 13, hour: 0, minute: 0, zone: timeZone })}
    openingHours={this.standardOpeningHours}
    showCuttOffTime={true}
  />
  <hr size="1" color="#cccccc" />
  <OpeningHours
    currentDate={this.withoutCuttOffTimeDate}
    openingHours={this.openingHoursSingleDay}
    showCuttOffTime={false}
  />
</div>
```
