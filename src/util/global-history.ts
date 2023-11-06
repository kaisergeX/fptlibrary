import {useNavigate, type NavigateFunction} from 'react-router-dom';

/** Provide a way to useNavigate outside of component */
export let globalNavigate: NavigateFunction;

export const GlobalHistory = () => {
  globalNavigate = useNavigate();

  return null;
};
