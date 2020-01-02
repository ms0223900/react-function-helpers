import combineReducers from '../functions/combineReducers'

describe('test combineReducers function', () => {
  interface IState {
    a: string,
    b: number[]
  }
  const myState: IState = {
    a: '',
    b: []
  };
  const a = (state: IState, action: any) => {
    switch (action) {
      case 'a':
        return 'a';
      default:
        return state.a;
    }
  };
  const b = (state: IState, action: any) => {
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
    const combinedReducers = combineReducers<IState>(reducers);
    expect(combinedReducers(myState, 'a')).toEqual(EXPECT);
  });
});