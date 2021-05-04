import { useEffect, useRef } from 'react';
import isDeepEqualReact from 'fast-deep-equal/es6/react';
export var isDeepEqual = isDeepEqualReact;

function useDeepCompareMemoize(value) {
  var ref = useRef(); // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!isDeepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(effect) {
  var dependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  useEffect(effect, useDeepCompareMemoize(dependencies));
}

export default useDeepCompareEffect;