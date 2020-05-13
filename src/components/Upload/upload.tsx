import React, { FC, ChangeEvent, useRef, useState } from 'react'

import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string,
  size: number,
  name: string,
  percentage?: number,
  status?: UploadFileStatus,
  raw?: File,
  response?: any,
  error?: any
}

export interface UploadProps {
  defaultFileList?: UploadFile[],
  action: string,
  onProgress?: (percentage: number, file: File) => void,
  onSuccess?: (data: any, file: File) => void,
  onError?: (data: any, file: File) => void,
  beforeUpload?: (file: File) => boolean | Promise<File>
  onChange?: (file: File) => void,
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: string },
  data?: { [key: string]: string }
  name?: string,
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
}
export const Upload: FC<UploadProps> = (props) => {
  const {
    defaultFileList,
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    onRemove,
    name,
    data,
    headers,
    withCredentials,
    accept,
    multiple,
    drag,
    children
  } = props
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const fileRef = useRef<HTMLInputElement>(null)
  const updateFileList = (updateFile: UploadFile, updateFileObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateFileObj }
        } else {
          return file
        }
      })

    })
  }
  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }

    uploadFiles(files)

  }
  let post = (file: File) => {
    const _file = {
      uid: Date.now + 'upload-file', name: file.name, size: file.size, percentage: 0, raw: file
    }
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys((key: string) => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e: ProgressEvent) => {
        let percentage = Math.round(e.loaded * 100 / e.total) || 0
        updateFileList(_file, { percentage, status: 'uploading' })
        if (onProgress && percentage < 100) {
          onProgress(percentage, file)
        }
      }
    }).then((data: any) => {
      updateFileList(_file, { status: 'success' })
      if (onSuccess) {
        onSuccess(data, file)
      }
      if (onChange) {
        onChange(file)
      }
      console.log(data)
    }).catch((err: any) => {
      updateFileList(_file, { status: 'error' })
      if (onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      }
      console.log(err)
    })
  }
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (beforeUpload) {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((resFile) => {
            post(resFile)
          })
        } else if (result !== false) {
          post(file)
        }
      } else {
        post(file)
      }
    })

  }
  return <div
    className="leod-upload-component"
  >
    <div className="leod-upload-input"
      style={{ display: 'inline-block' }}
      onClick={handleClick}>
      {drag ?
        <Dragger onFile={(files) => { uploadFiles(files) }}>
          {children}
        </Dragger> :
        children
      }
      <input
        className="leod-file-input"
        style={{ display: 'none' }}
        ref={fileRef}
        onChange={handleFileChange}
        type="file"
        accept={accept}
        multiple={multiple}
      />
    </div>

    <UploadList
      fileList={fileList}
      onRemove={handleRemove}
    />
  </div>
}


export default Upload
