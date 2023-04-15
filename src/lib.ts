const locales = {
  en_us: {
    hello: "Hi {user}",
    greeting: {
      morning: "Good morning {user}",
      event: "Good evening {user}",
      detail: {
        home: "my sweet home",
        school: "my sweet school",
      }
    }
  }
};
type LocaleMap = typeof locales;
type LocaleName = keyof LocaleMap
type Locale = LocaleMap[LocaleName]
type PathInto<T extends Record<string, any>> = keyof {
  [K in keyof T as T[K] extends string
  ? K
  : (T[K] extends Record<string, any> ? `${K & string}.${PathInto<T[K]> & string}` : never)
  ]: any
};
// type foo = PathInto<Locale>;
let currentLocale: LocaleName = 'en_us';

function get(object: Record<string, unknown>, path: Array<string>): string {
  const key = path[0];
  if (key === undefined)
    return '';
  const result = object[key];
  if (result === undefined)
    return '';
  if (typeof result === 'string') {
    return result;
  }
  return get(Object(result), path.slice(1));
}
export function t(key: PathInto<Locale>): string {
  return get(locales[currentLocale], key.split("."));
}
