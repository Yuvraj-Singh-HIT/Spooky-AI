import { c as create_ssr_component, e as escape, d as add_attribute, v as validate_component, f as each } from "../../chunks/index2.js";
import "sse.js";
const ChatMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { message } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  return `<div class="${"chat " + escape(type === "user" ? "chat-end" : "chat-start", true) + " justify-end font-sans"}"><div class="chat-image avatar"><div class="w-10 rounded-full"><img src="${"https://ui-avatars.com/api/?name=" + escape(type === "user" ? "Me" : "B", true)}" alt="${escape(type, true) + " avatar"}"></div></div>
	<div class="chat-header font-sans">${escape(type === "user" ? "Me" : "Bot")}</div>
	<div class="${"chat-bubble " + escape(
    type === "user" ? "chat-bubble-primary" : "chat-bubble-secondary",
    true
  ) + " font-sans"}">${escape(message)}</div></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-khyhgx{font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif}@keyframes svelte-khyhgx-float-ghost{0%,100%{transform:translateY(0) translateX(0);opacity:0.6}25%{transform:translateY(-20px) translateX(10px);opacity:0.8}50%{transform:translateY(-10px) translateX(-5px);opacity:0.4}75%{transform:translateY(-30px) translateX(15px);opacity:0.7}}@keyframes svelte-khyhgx-float-ghost-delayed{0%,100%{transform:translateY(0) translateX(0);opacity:0.4}33%{transform:translateY(-15px) translateX(-10px);opacity:0.6}66%{transform:translateY(-25px) translateX(8px);opacity:0.3}}@keyframes svelte-khyhgx-float-ghost-slow{0%,100%{transform:translateY(0) translateX(0);opacity:0.5}50%{transform:translateY(-12px) translateX(6px);opacity:0.8}}@keyframes svelte-khyhgx-fog{0%,100%{opacity:0.1;transform:translateY(0)}50%{opacity:0.3;transform:translateY(-10px)}}.animate-float-ghost.svelte-khyhgx{animation:svelte-khyhgx-float-ghost 8s ease-in-out infinite}.animate-float-ghost-delayed.svelte-khyhgx{animation:svelte-khyhgx-float-ghost-delayed 6s ease-in-out infinite 2s}.animate-float-ghost-slow.svelte-khyhgx{animation:svelte-khyhgx-float-ghost-slow 10s ease-in-out infinite 4s}.animate-fog.svelte-khyhgx{animation:svelte-khyhgx-fog 12s ease-in-out infinite}.overflow-y-auto.svelte-khyhgx::-webkit-scrollbar{width:8px}.overflow-y-auto.svelte-khyhgx::-webkit-scrollbar-track{background:rgba(0, 0, 0, 0.3);border-radius:10px}.overflow-y-auto.svelte-khyhgx::-webkit-scrollbar-thumb{background:linear-gradient(to bottom, #10b981, #8b5cf6);border-radius:10px;border:1px solid rgba(16, 185, 129, 0.3)}.overflow-y-auto.svelte-khyhgx::-webkit-scrollbar-thumb:hover{background:linear-gradient(to bottom, #059669, #7c3aed);box-shadow:0 0 10px rgba(16, 185, 129, 0.5)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let query = "";
  let chatMessages = [];
  let scrollToDiv;
  $$result.css.add(css);
  return `<div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden font-sans svelte-khyhgx">
	<div class="absolute inset-0 svelte-khyhgx">
		<div class="absolute top-20 left-10 w-4 h-4 bg-green-400 rounded-full opacity-60 animate-float-ghost shadow-lg shadow-green-400/50 svelte-khyhgx"></div>
		<div class="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-float-ghost-delayed shadow-lg shadow-blue-400/50 svelte-khyhgx"></div>
		<div class="absolute bottom-40 left-1/4 w-5 h-5 bg-purple-400 rounded-full opacity-50 animate-float-ghost-slow shadow-lg shadow-purple-400/50 svelte-khyhgx"></div>
		<div class="absolute top-60 right-1/3 w-2 h-2 bg-cyan-400 rounded-full opacity-70 animate-float-ghost shadow-lg shadow-cyan-400/50 svelte-khyhgx"></div>
		
		
		<div class="absolute inset-0 bg-gradient-to-t from-transparent via-gray-800/20 to-transparent animate-fog svelte-khyhgx"></div></div>
	
	
	<div class="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 svelte-khyhgx">
		<div class="w-full max-w-4xl bg-black/40 backdrop-blur-sm rounded-2xl border border-green-400/30 shadow-2xl shadow-green-400/20 relative svelte-khyhgx">
			<div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/10 via-purple-400/10 to-green-400/10 animate-pulse svelte-khyhgx"></div>
			
			
			<div class="bg-gradient-to-r from-green-600/80 to-purple-600/80 rounded-t-2xl p-4 relative font-sans svelte-khyhgx"><div class="flex items-center space-x-3 svelte-khyhgx"><div class="w-10 h-10 bg-green-400/20 rounded-xl flex items-center justify-center border border-green-400/50 svelte-khyhgx"><svg class="w-5 h-5 text-green-400 svelte-khyhgx" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" class="svelte-khyhgx"></path></svg></div>
					<div class="svelte-khyhgx"><h1 class="text-xl font-bold text-green-400 drop-shadow-lg font-sans svelte-khyhgx">👻 Spooky AI</h1>
						<p class="text-green-200 text-sm font-sans svelte-khyhgx">Haunted by Local Spirits</p></div>
					<div class="ml-auto flex items-center space-x-4 svelte-khyhgx">
						<button class="${"flex items-center space-x-2 bg-green-400/20 hover:bg-green-400/30 border border-green-400/50 rounded-lg px-3 py-1 transition-all duration-200 " + escape(
    "",
    true
  ) + " svelte-khyhgx"}"${add_attribute(
    "title",
    "Turn on spooky ambient sound",
    0
  )}><svg class="w-4 h-4 text-green-400 svelte-khyhgx" fill="currentColor" viewBox="0 0 24 24">${`<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" class="svelte-khyhgx"></path>`}</svg>
							<span class="text-green-400 text-xs font-sans svelte-khyhgx">${escape("🔊")}</span></button>
						
						
						<div class="flex items-center space-x-2 svelte-khyhgx"><div class="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 svelte-khyhgx"></div>
							<span class="text-green-400 text-sm font-medium font-sans svelte-khyhgx">Haunting</span></div></div></div></div>

			
			<div class="h-[500px] p-4 overflow-y-auto bg-black/30 relative font-sans svelte-khyhgx">
				<div class="space-y-4 svelte-khyhgx">${validate_component(ChatMessage, "ChatMessage").$$render(
    $$result,
    {
      type: "assistant",
      message: "👻 Boo! Welcome to the haunted realm! What mysteries shall we explore together?"
    },
    {},
    {}
  )}
					${each(chatMessages, (message) => {
    return `${validate_component(ChatMessage, "ChatMessage").$$render(
      $$result,
      {
        type: message.role,
        message: message.content || ""
      },
      {},
      {}
    )}`;
  })}
					${``}
					${``}</div>
				<div class="svelte-khyhgx"${add_attribute("this", scrollToDiv, 0)}></div></div>

			
			<div class="p-4 border-t border-green-400/20 bg-black/20 rounded-b-2xl relative font-sans svelte-khyhgx"><form class="flex space-x-3 svelte-khyhgx"><input type="text" placeholder="Speak to the spirits..." class="flex-1 bg-black/30 border border-green-400/30 rounded-xl px-4 py-3 text-green-400 placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent focus:shadow-lg focus:shadow-green-400/20 font-sans svelte-khyhgx" ${""}${add_attribute("value", query, 0)}>
					<button type="submit" ${!query.trim() ? "disabled" : ""} class="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed border border-green-400/50 shadow-lg shadow-green-400/20 hover:shadow-green-400/40 font-sans svelte-khyhgx">${escape("👻 Summon")}</button></form></div></div></div>
</div>`;
});
export {
  Page as default
};
