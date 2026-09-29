import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Marketing site: fully prerendered to static HTML.
			adapter: adapter({ fallback: undefined }),

			// GitHub Pages serves a project site from /<repo>; the deploy workflow
			// passes that prefix in as BASE_PATH (empty for a custom domain).
			paths: {
				base: process.env.BASE_PATH ?? ''
			}
		})
	]
});
