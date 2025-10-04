

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a3c36133.js","_app/immutable/chunks/index.07784548.js","_app/immutable/chunks/singletons.52539acb.js"];
export const stylesheets = [];
export const fonts = [];
