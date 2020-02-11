import calNewIndex, { CalNewIndexParam } from '../../helperFns/calNewIndex';

describe('test calNewIndex function', () => {
  const addCondition_mockData: CalNewIndexParam = {
    indexNow: 1,
    lastIndex: 5,
  };
  const minusCondition_mockData: CalNewIndexParam = {
    ...addCondition_mockData,
  };

  it('test "+" situation, and it should be 0 if plused number is bigger than lastIndex', () => {
    expect(calNewIndex('+')(addCondition_mockData)).toEqual(addCondition_mockData.indexNow + 1);
    expect(calNewIndex('+')({
      ...addCondition_mockData,
      indexNow: addCondition_mockData.lastIndex
    })).toEqual(0);
  });

  it('test "-" situation, and it should be lastIndex if minused number is smaller than 0', () => {
    expect(calNewIndex('-')(minusCondition_mockData)).toEqual(addCondition_mockData.indexNow - 1);
    expect(calNewIndex('-')({
      ...minusCondition_mockData,
      indexNow: 0,
    })).toEqual(minusCondition_mockData.lastIndex);
  });
});