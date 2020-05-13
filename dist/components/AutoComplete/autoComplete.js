var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input/input';
import classNames from 'classnames';
import Icon from '../Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState([]), suggestions = _c[0], setSuggestions = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    var deBounceValue = useDebounce(inputValue);
    useEffect(function () {
        if (deBounceValue && triggerSearch) {
            var reuslt = fetchSuggestions(deBounceValue);
            if (reuslt instanceof Promise) {
                setLoading(true);
                reuslt.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(reuslt);
            }
        }
        else {
            setSuggestions([]);
        }
    }, [deBounceValue, fetchSuggestions]);
    var handleChange = function (e) {
        triggerSearch.current = false;
        var value = e.target.value.trim();
        setInputValue(value);
    };
    var handleSeletct = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = true;
    };
    var highlight = function (index) {
        console.log(index);
        if (index < 0)
            index = 0;
        if (index > suggestions.length - 1)
            index = suggestions.length - 1;
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions.length > 0) {
                    handleSeletct(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    var renderTemplete = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropDown = function () {
        return React.createElement("ul", { className: "leod-suggestion-list" }, suggestions.map(function (item, index) {
            var cnames = classNames('suggestion-item', {
                'is-active': index === highlightIndex
            });
            return React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSeletct(item); } }, renderTemplete(item));
        }));
    };
    return React.createElement("div", __assign({ className: "leod-auto-complete" }, restProps, { ref: componentRef }),
        React.createElement(Input, { value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }),
        React.createElement(Icon, { icon: ['fas', 'spinner'], size: "lg", spin: true }),
        loading &&
            React.createElement("div", { className: "suggstions-loading-icon" },
                React.createElement(Icon, { icon: "spinner", spin: true })),
        setSuggestions.length > 0 && generateDropDown());
};
export default AutoComplete;
