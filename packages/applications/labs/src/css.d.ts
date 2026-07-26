// CSS is handled by css-loader, which exports the class-name map as the default
// export (see the `modules.namedExport: false` option in build-tool's webpack
// config). Plain .css imports are side-effect only.
declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module "*.css";
