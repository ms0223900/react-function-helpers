import { getSelectedRouteNameValue, defaultTextAndValue, filterRoutesByValue } from '../../../../components/common-components/FilterSelector/fn';
import { SelectorOptions } from '../../../../components/common-components/FilterSelector/types';
import { selectorOptions } from './__mocks/common-mocks';

describe('test filterRoutesByValue in FilterSelector', () => {
  it('test routes is not null condition but value.length is 0', () => {
    expect(filterRoutesByValue('', selectorOptions)).toHaveLength(selectorOptions.length);
  });

  it('test routes is not null condition but value.length is "not" 0', () => {
    expect(filterRoutesByValue('a', selectorOptions)).toHaveLength(0);
  });
});

describe('test getSelectedRouteNameValue function', () => {
  it('test routes is null condition', () => {
    const res = getSelectedRouteNameValue([], undefined);
    expect(res).toEqual(defaultTextAndValue);
  });

  it('test routes is "not" null but matchedRoute is undefined condition', () => {
    const res = getSelectedRouteNameValue([], undefined);
    expect(res).toEqual(defaultTextAndValue);
  });

  it('test routes is "not" null and matchedRoute is "not" undefined condition', () => {
    const singleRoute = {
      text: 'a',
      value: 'b',
    };
    const routes: SelectorOptions = [singleRoute];
    const selectedRouteId = 'b';

    const res = getSelectedRouteNameValue(routes, selectedRouteId);
    expect(res).toEqual(singleRoute);
  });
});