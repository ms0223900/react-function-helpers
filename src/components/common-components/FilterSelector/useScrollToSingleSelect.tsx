import { SelectsInFilterProps } from "./types";
import { useEffect } from "react";

const useScrollToSingleSelect = (
  listRefs: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>, 
  selectedIndex: SelectsInFilterProps['selectedIndex']
) => {
  useEffect(() => {
    if(typeof selectedIndex === 'number') {
      const itemRefNow = listRefs.current[selectedIndex];
      if(itemRefNow && itemRefNow.current) {
        itemRefNow.current.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);
  
  return {};
};

export default useScrollToSingleSelect;