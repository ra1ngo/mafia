import { writable } from 'svelte/store';

export const fps = writable(60);
export const ping = writable(0);
export const x = writable(0);
export const y = writable(0);
