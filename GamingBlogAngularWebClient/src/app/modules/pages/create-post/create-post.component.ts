import {Component, OnInit} from '@angular/core';
import {IImageService} from "../../../core/services/interfaces/image.service";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {CreatePostRequest} from "../../../core/models/create-post-request";
import {IApplicationService} from "../../../core/services/interfaces/application.service";
import {IPostService} from "../../../core/services/interface-post.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICategoryService} from "../../../core/services/interfaces/category.service";
import {CategoryResponse} from "../../../core/models/category-response";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  isLoading: boolean = true;
  categories: CategoryResponse[] | undefined;
  currentFile?: File;
  message = '';
  errorMsg = '';
  uploadStarted: boolean = false;
  uploadProgress: number = 0;
  currentImageSrc: string | ArrayBuffer | null | undefined;
  isPostCreationStarted: boolean = false;
  isPostCreated: boolean = false;
  isPostCreatedError: boolean = false;

  createPostForm: FormGroup;

  constructor(private imageService: IImageService, private applicationService: IApplicationService,
              private postService: IPostService, private categoryService: ICategoryService) {
    this.createPostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)]),
      htmlContent: new FormControl('', [Validators.required, Validators.minLength(1)]),
      categoryName: new FormControl('', [Validators.required]),
    });
  }

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;

    this.categories = await this.categoryService.retrieveAll();

    this.isLoading = false;
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files[0];

    if (this.currentFile && !this.fileIsNotImage()) {
      const reader = new FileReader();
      reader.onload = e => this.currentImageSrc = reader.result;

      reader.readAsDataURL(this.currentFile);
    }

  }

  upload(): void {
    const file = this.currentFile;

    if (file) {
      this.uploadStarted = true;
      this.imageService.upload(file, this.getFileKebabCaseName()).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            Swal.fire({
              titleText: 'Obrázek byl úspěšně nahrán do systému.',
              icon: 'success',
              confirmButtonText: 'Zavřít'
            });
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            Swal.fire({
              titleText: 'Obrázek nemohl být nahrán, protože obrázek s daným jménem je již v systému.',
              icon: 'error',
              confirmButtonText: 'Zavřít'
            });
          }
        }
      );
    }


  }

  fileIsTooBig(): boolean {
    if (!this.currentFile)
      return true;

    // The image file cannot be larger than 2MB.
    return this.currentFile.size > 2097152
  }

  public async save() {
    if (this.currentFile) {

      let createPostRequest: CreatePostRequest = {
        title: this.title.value,
        htmlContent: this.htmlContent.value,
        description: this.description.value,
        imageName: this.getFileKebabCaseName(),
        authorUsername: this.applicationService.loggedUser.username,
        category: this.category.value
      };

      try {
        this.isPostCreationStarted = true;
        await this.postService.createPost(createPostRequest);
        await Swal.fire({
          titleText: 'Článek je úspěšně vytvořen.',
          icon: 'success',
          confirmButtonText: 'Zavřít'
        });
        this.isPostCreated = true;

        this.upload();
      } catch (err) {
        if (err instanceof HttpErrorResponse) {
          await Swal.fire({
            titleText: 'Článek nemohl být vytvořen. Je možné že článek s daným jménem již existuje.',
            icon: 'error',
            confirmButtonText: 'Zavřít'
          });
          this.isPostCreatedError = true;
          return;
        }
      }
    }
  }

  fileIsNotImage(): boolean {
    if (!this.currentFile)
      return true;

    return this.currentFile.type.match(/image\/*/) === null;
  }

  getFileKebabCaseName(): string {
    if (this.currentFile)
      return this.currentFile.name
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
    else
      return '';
  }

  get title(): FormControl {
    return <FormControl>this.createPostForm.get('title');
  }

  get description(): FormControl {
    return <FormControl>this.createPostForm.get('description');
  }

  get htmlContent(): FormControl {
    return <FormControl>this.createPostForm.get('htmlContent');
  }

  get category(): FormControl {
    return <FormControl>this.createPostForm.get('categoryName');
  }

}
