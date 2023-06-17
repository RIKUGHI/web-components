import { countDatesInRange } from './dateUtils';
import { format } from './utils';

describe('format', () => {
  it('counting dates in range', () => {
    expect(countDatesInRange(new Date(), new Date(2023, 5, 20))).toEqual(4);
  });
});
