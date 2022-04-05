import {IImageService} from "./interfaces/image.service";
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ImageService implements IImageService {
  constructor(private http: HttpClient) {
  }

  upload(file: File, fileName: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('fileName', fileName);

    const req = new HttpRequest('POST', `/api/images/upload`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


}
