import {Observable} from "rxjs";
import {HttpEvent} from "@angular/common/http";

export abstract class IImageService {
  abstract upload(file: File, fileName: string): Observable<HttpEvent<any>>;
}
