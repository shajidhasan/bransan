import sveltePreprocess from "svelte-preprocess";

export default {
  preprocess: sveltePreprocess({
    scss: { includePaths: ["src/styles"], prependData: `@import 'variables';` },
  }),
};
