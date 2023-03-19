import Showcase from "./components/showcase";
import { render } from "solid-js/web";
import "./app.postcss";

render(() => <Showcase />, document.getElementById("app") as HTMLElement);
