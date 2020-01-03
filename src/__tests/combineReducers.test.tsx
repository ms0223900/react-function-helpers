import combineReducers from '../functions/combineReducers';

describe('test combineReducers function', () => {
  interface State {
    a: string,
    b: number[]
  }
  const myState: State = {
    a: '',
    b: []
  };
  const a = (state: State, action: any) => {
    switch (action) {
      case 'a':
        return 'a';
      default:
        return state.a;
    }
  };
  const b = (state: State, action: any) => {
    switch (action) {
      case 'b':
        return [1];
      default:
        return state.b;
    }
  };
  const reducers = {
    a,
    b,
  };

  it('should render correctly', () => {
    const EXPECT = {
      ...myState,
      a: 'a',
    };
    const combinedReducers = combineReducers<State>(reducers);
    expect(combinedReducers(myState, 'a')).toEqual(EXPECT);
  });
});