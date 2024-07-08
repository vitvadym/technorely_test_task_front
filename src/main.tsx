import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { store } from "./app/store/store.ts";
import { Provider } from "react-redux";
import { saveState } from "./helpers/persistState.ts";

store.subscribe(() => {
  saveState(store.getState().user, "user");
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
