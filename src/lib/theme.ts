/** Shared by the toggle (client) and the layout <head> (server). */
export const THEME_KEY = "velorex-theme";

/**
 * Inline, render-blocking snippet for <head>: applies the saved theme before
 * first paint so light-mode visitors never see a dark flash.
 */
export const themeBootScript = `try{if(localStorage.getItem("${THEME_KEY}")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;
