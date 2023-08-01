const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

// Definindo o estado inicial
const initialState = {
  counter: 0,
};

// O reducer recebe o estado atual e a ação
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      // Retorna o novo estado com o contador incrementado
      return {
        ...state,
        counter: state.counter + 1,
      };
    default:
      // Retorna o estado atual caso a ação não seja reconhecida
      return state;
  }
};

export default counterReducer;
