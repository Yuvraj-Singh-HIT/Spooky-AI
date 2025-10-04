export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.d680da53.js","app":"_app/immutable/entry/app.813956ff.js","imports":["_app/immutable/entry/start.d680da53.js","_app/immutable/chunks/index.07784548.js","_app/immutable/chunks/singletons.52539acb.js","_app/immutable/entry/app.813956ff.js","_app/immutable/chunks/index.07784548.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
