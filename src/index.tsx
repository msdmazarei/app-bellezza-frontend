import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import {App} from './components/app';
ReactDOM.render(
    // <Hello compiler="TypeScript" framework="React" />
    <App></App>
    ,
    document.getElementById("example")
);