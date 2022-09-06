import colors from '../enum/colors';

interface message {
  time: Date;
  title: string;
  msg?: string;
  color: colors;
}
export default message;
