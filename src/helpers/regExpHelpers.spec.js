/* global describe, it */
/* eslint-disable max-len */
import { parseRegExp } from './regExpHelpers';

describe('parseRegExp', () => {

  it('converts string to RegExp', () => {
    // Without flags
    const regExpString1 = '/^(\\b([A-Za-z]{1,2}[0-9]{1}[A-Za-z]{1})\\s{0,1}([0-9]{1}[ABDEFGHJLNPQRSTUWXYZ]{2})\\b)|(\\b([A-Za-z]{1,2}[0-9]{1,2})\\s{0,1}([0-9]{1}[ABDEFGHJLNPQRSTUWXYZ]{2})\\b)|(\\b(GIR)\\s{0,1}(0AA)\\b)$/';
    const regExpExpected1 = /^(\b([A-Za-z]{1,2}[0-9]{1}[A-Za-z]{1})\s{0,1}([0-9]{1}[ABDEFGHJLNPQRSTUWXYZ]{2})\b)|(\b([A-Za-z]{1,2}[0-9]{1,2})\s{0,1}([0-9]{1}[ABDEFGHJLNPQRSTUWXYZ]{2})\b)|(\b(GIR)\s{0,1}(0AA)\b)$/;

    // With one flag
    const regExpString2 = '/^(\\+353(\\(0\\))?|0)(\\s*\\d){7,}$/i';
    const regExpExpected2 = /^(\+353(\(0\))?|0)(\s*\d){7,}$/i;

    // With multiple flags
    const regExpString3 = '/^(.*)$/gi';
    const regExpExpected3 = /^(.*)$/gi;

    // Without flags and slashes
    const regExpString4 = '^(.*)$';
    const regExpExpected4 = /^(.*)$/;

    expect(parseRegExp(regExpString1).source).toBe(regExpExpected1.source);
    expect(parseRegExp(regExpString1).flags).toBe(regExpExpected1.flags);

    expect(parseRegExp(regExpString2).source).toBe(regExpExpected2.source);
    expect(parseRegExp(regExpString2).flags).toBe(regExpExpected2.flags);

    expect(parseRegExp(regExpString3).source).toBe(regExpExpected3.source);
    expect(parseRegExp(regExpString3).flags).toBe(regExpExpected3.flags);

    expect(parseRegExp(regExpString4).source).toBe(regExpExpected4.source);
    expect(parseRegExp(regExpString4).flags).toBe(regExpExpected4.flags);
  });

});
