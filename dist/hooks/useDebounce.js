import { useEffect, useState } from 'react';
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setInputValue(value);
        }, delay);
        return function () {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return inputValue;
}
export default useDebounce;
