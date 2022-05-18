import HttpClient from "../HttpClient";

export class ImageService {
    upload(file: File, fileName: string, onProgressUpload: (progressEvent: any) => void) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);

        return HttpClient.post('/api/images/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: onProgressUpload
        });
    }
}