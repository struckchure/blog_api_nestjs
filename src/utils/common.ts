export function exclude(object: any, keys: string | any[]) {
  if (!keys.length) return object;

  for (const key of keys) {
    delete object[key];
  }
  return object;
}
