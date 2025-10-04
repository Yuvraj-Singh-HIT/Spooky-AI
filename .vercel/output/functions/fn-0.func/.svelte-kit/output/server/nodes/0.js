

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.578a8078.js","_app/immutable/chunks/index.07784548.js"];
export const stylesheets = ["_app/immutable/assets/0.a711e775.css"];
export const fonts = [];
