import stringToSnakeCase from './string-to-snake-case';

export default function objectKeysToSnakeCase<T>(
  object: T,
): T {
  const objectKeys = Object.keys(object);

  const newObject = {};
  objectKeys.forEach((objectKey) => {
    newObject[stringToSnakeCase(objectKey)] = object[objectKey];
  });
  return newObject as T;
}
