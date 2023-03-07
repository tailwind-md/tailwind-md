import Showcase from "./components/showcase";
import { render } from "solid-js/web";
import "./app.postcss";

const routes = import.meta.glob("./routes/**/*.{tsx,ts}", { eager: true });
console.log(routes);

render(() => <Showcase />, document.getElementById("app"));
