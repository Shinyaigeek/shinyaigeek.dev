import type { Story } from "@ladle/react";
import { Header } from "./header";

export const BasicHeader: Story = function () {
	return <Header language="ja" currentPath="/" page="home" />;
};
