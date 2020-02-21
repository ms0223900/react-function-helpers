import { GradientResultProps } from "./GradientResult";
import { ACTION_TYPES, GradientActions } from "./actions";

type State = GradientResultProps

export const initGradientItem = {
  id: 0,
  color: '#aff',
  percent: 0,
};

const initState = {
  degree: 90,
  gradientItemValueList: [
    initGradientItem,
    {
      id: 0,
      color: '#0bd',
      percent: 100,
    }
  ]
};

let colorsMaxId = 1;

const reducer = (state: State, action: GradientActions): State => {
  switch (action.type) {
    case ACTION_TYPES.ADD_COLOR:
      colorsMaxId += 1;
      return ({
        ...state,
        gradientItemValueList: [
          ...state.gradientItemValueList,
          {
            ...initGradientItem,
            id: colorsMaxId,
          },
        ]
      });

    case ACTION_TYPES.EDIT_COLOR_PERCENT: {
      const {
        id,
        name,
        value
      } = action.payload;

      let newValueList = [...state.gradientItemValueList];
      const index = newValueList.findIndex(v => v.id === id);
      if(index !== -1) {
        newValueList[index] = {
          ...newValueList[index],
          [name]: value
        };
      }
      return ({
        ...state,
        gradientItemValueList: newValueList,
      });
    }

    case ACTION_TYPES.DELETE_COLOR: {
      const { id } = action.payload;
      const deleted = state.gradientItemValueList.filter(v => v.id !== id);
      return ({
        ...state,
        gradientItemValueList: deleted,
      });
    }

    default:
      return state;
  }
};

export default reducer;