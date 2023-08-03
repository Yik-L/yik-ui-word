export default {
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const YikUi = await import("@yik_l/ui");
      console.log(YikUi);
      app.use(YikUi);
    }
  },
};
