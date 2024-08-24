import { snakeCase } from 'lodash';

export default function stringToSnakeCase(text: string): string {
  return snakeCase(text);
}
