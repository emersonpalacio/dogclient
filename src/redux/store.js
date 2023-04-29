// import { createStore, applyMiddleware, compose } from "redux";
// import { reducer } from "./reducer";
// import thunk from "redux-thunk";

// export const store = createStore(
//   reducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

//////////////////////////////////
import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

//////////////////////////////////////////////////////////////////

// import { compose, createStore, applyMiddleware } from "redux";

// import reduxThunk from "redux-thunk";
// import reducers from "./reducers";

// export const store = createStore(
//   applyMiddleware(reduxThunk),
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
// )(createStore)(reducers);

// //export default store;
