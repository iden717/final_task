import { createContext, useReducer } from "react";

export const LinkContext = createContext();

const initialState = {
  links: [
    {
      id: 1,
    },
  ],
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_LINK":
      const findId = state.links.map((d) => {
        return d;
      });

      const convert = Object.entries(findId[0]);

      return {
        ...state,
        links: [...state.links, { id: convert[0][1] + 1 }],
      };
    default:
      throw new Error();
  }
};

export const LinkContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LinkContext.Provider value={[state, dispatch]}>
      {children}
    </LinkContext.Provider>
  );
};
