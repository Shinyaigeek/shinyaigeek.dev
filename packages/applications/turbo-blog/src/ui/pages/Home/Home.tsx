import type { FunctionComponent } from "react";
import { Counter } from "../../components/Counter/Counter";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";

export const Home: FunctionComponent = () => (
	<div>
		<WelcomePage />
		<Counter />
	</div>
);
