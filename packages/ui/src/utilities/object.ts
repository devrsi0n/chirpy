import { JsonObject } from 'type-fest';

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param objects - Objects to merge
 * @returns New object with merged key/values
 */
export function mergeDeep<Obj1 extends JsonObject, Obj2 extends JsonObject>(
  obj1: Obj1,
  obj2: Obj2,
): Obj1 & Obj2;
export function mergeDeep<
  Obj1 extends JsonObject,
  Obj2 extends JsonObject,
  Obj3 extends JsonObject,
>(obj1: Obj1, obj2: Obj2, obj3: Obj3): Obj1 & Obj2 & Obj3;
export function mergeDeep(...objects: JsonObject[]) {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        // eslint-disable-next-line unicorn/prefer-spread
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

function isObject(obj: unknown): obj is JsonObject {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}
