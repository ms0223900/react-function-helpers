import { SelectorOptions } from "./types";

export const defaultTextAndValue = {
  text: '',
  value: '',
  name: ''
};

export const getSelectedRouteNameValue = (
  routes: SelectorOptions, 
  selectedRouteId: string | null | undefined
)  => {
  if(routes) {
    const matchedRoute = routes.find(data => data.value === selectedRouteId);
    if(matchedRoute) {
      return matchedRoute;
    }
  }
  return defaultTextAndValue;
};

export const filterRoutesByValue = (value: string, routes: SelectorOptions) => {
  const filtered = routes.filter(option => option.text.includes(value));
  return value.length === 0 ? routes : filtered;
};