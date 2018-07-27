import {
  getFromSessionStorage,
  saveToSessionStorage,
  removeFromSessionStorage
} from './sessionStorage';

describe('saveToSessionStorage and getFromSessionStorage', () => {
  const stringData = 'Hello World!';
  const numberData = 42;
  const objectData = { foo: 'bar' };

  it('works with strings properly', () => {
    saveToSessionStorage('stringData', stringData);
    expect(getFromSessionStorage('stringData')).toEqual(stringData);
  });

  it('works with numbers properly', () => {
    saveToSessionStorage('numberData', numberData);
    expect(parseInt(getFromSessionStorage('numberData'), 10)).toEqual(numberData);
  });

  it('works with objects properly', () => {
    saveToSessionStorage('objectData', objectData);
    expect(getFromSessionStorage('objectData')).toEqual(objectData);
  });
});

describe('removeFromSessionStorage', () => {
  const data = 'Hello World!';

  it('removes the data from sessionStorage', () => {
    expect(getFromSessionStorage('data')).toEqual(null);
    saveToSessionStorage('data', data);
    expect(getFromSessionStorage('data')).toEqual(data);
    removeFromSessionStorage('data');
    expect(getFromSessionStorage('data')).toEqual(null);
  });

});
