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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Button from '../Button/button';
import UploadList from './uploadList';
import Dragger from './dragger';
export var Upload = function (props) {
    var defaultFileList = props.defaultFileList, action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, onRemove = props.onRemove, name = props.name, data = props.data, headers = props.headers, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var fileRef = useRef(null);
    var updateFileList = function (updateFile, updateFileObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateFileObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var HandleClick = function () {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var handleChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
    };
    var post = function (file) {
        var _file = {
            uid: Date.now + 'upload-file', name: file.name, size: file.size, percentage: 0, raw: file
        };
        setFileList(__spreadArrays([_file], fileList));
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round(e.loaded * 100 / e.total) || 0;
                updateFileList(_file, { percentage: percentage, status: 'uploading' });
                if (onProgress && percentage < 100) {
                    onProgress(percentage, file);
                }
            }
        }).then(function (data) {
            updateFileList(_file, { status: 'success' });
            if (onSuccess) {
                onSuccess(data, file);
            }
            if (onChange) {
                onChange(file);
            }
            console.log(data);
        }).catch(function (err) {
            updateFileList(_file, { status: 'error' });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
            console.log(err);
        });
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (beforeUpload) {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (resFile) {
                        post(resFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
            else {
                post(file);
            }
        });
    };
    return React.createElement("div", { className: "leod-upload-component" },
        React.createElement(Button, { onClick: HandleClick }, "upload File"),
        React.createElement("input", { type: "file", ref: fileRef, className: "leod-file-input", onChange: handleChange, accept: accept, multiple: multiple }),
        drag ? React.createElement(Dragger, { onFile: function (files) { return uploadFiles(files); } }, children) : { children: children },
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove }));
};
export default Upload;
