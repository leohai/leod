import React, { FC, DragEvent, useState } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void
}
export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const klass = classNames('leod-uploader-dragger', {
    'is-dragover': dragOver
  })
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  return (
    <div className={klass}
      onDragOver={(e: DragEvent<HTMLElement>) => {
        setDragOver(true)
      }}
      onDragLeave={(e: DragEvent<HTMLElement>) => {
        setDragOver(false)
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}
export default Dragger;