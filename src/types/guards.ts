import { METHODS } from 'src/constants';
import { Method } from './common.types';

export const isMethod = (method: any): method is Method => {
  return METHODS.includes(method);
};
