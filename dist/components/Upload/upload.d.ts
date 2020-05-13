import { FC } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    percentage?: number;
    status?: UploadFileStatus;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    defaultFileList?: UploadFile[];
    action: string;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (data: any, file: File) => void;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {
        [key: string]: string;
    };
    data?: {
        [key: string]: string;
    };
    name?: string;
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
