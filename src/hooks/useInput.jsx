import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = ({ value, isTouched }, action) => {
  if (action.type === 'INPUT') return { value: action.value, isTouched };
  if (action.type === 'BLUR') return { value, isTouched: true };
  if (action.type === 'RESET') return { value: '', isTouched: false };

  return initialInputState;
};

const useInput = (validateValue) => {
  const { inputState, dispacth } = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = ({ target }) =>
    dispacth({ type: 'INPUT', value: target.value });

  const inputBlurHandler = () => dispacth({ type: 'BLUR' });

  const reset = () => dispacth({ type: 'RESET' });

  return {
    value: inputState.value,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
