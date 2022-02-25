
export const state = () => ({
  openAiConfig: {
    engine: "text-davinci-001",
    temperature: 0.7,
    max_tokens: 65,
  },
});

export const mutations = {
  SET_OPENAI_CONFIG: (state, data) => {
    state.openAiConfig = { ...state.openAiConfig, ...data };
  },
};

export const actions = {
  SAVE_OPENAI_CONFIG: (context, payload) => {
    context.commit("SET_OPENAI_CONFIG", payload);
  },
};
