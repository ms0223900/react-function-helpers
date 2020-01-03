# react function helpers

## mapStateToProps
just like redux "mapStateToProps", but you must provider types if you use TypeScript

```
type OwnProps = { index: number, listData: SingleEstimateStop }

const mapStateToProps: MapStateToProps<DrivingMapState,OwnProps, {
  isSelected: boolean
}> = (state, ownProps) => ({
  isSelected: ownProps.index === state.selectedRouteStopIndex
});
```

## mapDispatchToProps
just like redux "mapDispatchToProps", but you must provider types if you use TypeScript

```
const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  listClickFn: (routeStopId: number) => any
}> = (dispatch) => ({
  listClickFn: (routeStopId: number) => {
    dispatch(setRouteStopId(routeStopId));
  }
});
```

## connectCtx
just like redux "connect", but you should provider context ContextStore for each use.

```
const ComponentWithCtx = connectCtx(ContextStore)(mapStateToProps?, mapDispatchToProps?)(Component)
```

## combineReducers
just like redux "combineReducers"

```
interface CollinearRoutesState {
  selectedRouteId: SelectedRouteId
  stopSearchFromTo: StopSearchFromTo
}

const reducers = combineReducers<CollinearRoutesState>({
  selectedRouteId: selectedRouteId_reducer,
  stopSearchFromTo: stopSearchFromTo_reducer,
});
```

---

## createContextValueFn
createContextValueFn create a function with custom state/dispatch paramters for ContextWrapper

```
const initState = {//context state...}
const reducers = {//reducers}

const ContextValueFn = createContextValueFn(initState, reducers);
```

## createContextStore
just create a ContextStore

```
const initState = {//context state...}
const ContextStore = createContextStore(initState, dispatch?)
```

## ContextWrapperFn
create a ContextWrapper

```
export const ContextWrapper = ContextWrapperFn(ContextValueFn, ContextStore);

//wrap a component which consume context
<ContextWrapper>
  <Component>
</ContextWrapper>
```