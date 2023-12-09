import type {ObjectAny} from '~/types';

export function isEqualNonNestedObj(obj1: ObjectAny, obj2: ObjectAny): boolean {
  const obj1Keys = Object.keys(obj1);
  if (!obj1Keys.every((key: string) => Object.keys(obj2).includes(key))) {
    return false;
  }

  for (const key of obj1Keys) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

/**
 * Remove Object properties based on its value or/and key.
 * ___
 * @param passCondition keys & values condition can be customized, properties that do **NOT** pass this condition will be removed.
 *
 * @returns new object, original one will not be mutated.
 * ___
 * @default passCondition Remove all falsy value properties.
 */
export const objectRemoveProperties = <T extends ObjectAny>(
  input: T,
  passCondition: ([key, value]: [keyof T, T[keyof T]]) => boolean = ([, v]) => !!v,
): Partial<T> =>
  Object.fromEntries(
    Object.entries(input).filter((item) => passCondition(item as [keyof T, T[keyof T]])),
  ) as Partial<T>;

/**
 * @example
 * const testObj = {
 *    foo: "bar", baz: 42, falsyNum: 0, falsyStr: "", a: null, s: undefined,
 *    arr: [], arr1: [0], arr2: [0, 2, 4], arr2: [0, 2, 4]
 * }
 * objectJoinArrayValues(testObj, ',', true)
 * => { foo: "bar", baz: 42, arr1: "0", arr2: "0,2,4" }
 */
export function objectJoinArrayValues<T extends ObjectAny>(
  obj: T,
  joinStr: string,
  options: {
    removeFalsyProperties?: boolean;
    preProcessValues?: (value: T[keyof T]) => unknown;
  } = {removeFalsyProperties: false},
): T {
  return Object.fromEntries(
    Object.entries(obj).flatMap(([key, value]) => {
      let processedValue = options.preProcessValues
        ? options.preProcessValues(value as T[keyof T])
        : value;

      if (typeof processedValue === 'object') {
        if (processedValue !== null && !Array.isArray(processedValue)) {
          // remove object and function properties
          return [];
        }

        // still respect the null value here
        // only remove null properties if removeFalsyProperties is true (by below `if` gate).
        processedValue &&= processedValue.join(joinStr);
      }

      if (options.removeFalsyProperties && !processedValue) {
        return [];
      }
      return [[key, processedValue]];
    }),
  ) as T;
}
