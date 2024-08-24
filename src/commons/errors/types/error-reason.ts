import { errorReasons } from '../constants';

type Keys = keyof typeof errorReasons;
type ErrorReason = typeof errorReasons[Keys];

export default ErrorReason;
