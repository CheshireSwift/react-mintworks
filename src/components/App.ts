import { h } from "react-hyperscript-helpers";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { rootReducer } from "../state";
import Layout from "./Layout";

const App = () => h(Provider, { store: createStore(rootReducer) }, [h(Layout)]);

export default App;
