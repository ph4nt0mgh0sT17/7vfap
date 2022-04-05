import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {IPostService} from "../../../core/services/interface-post.service";
import {PostResponse} from "../../../core/models/post-response";
import {ICategoryService} from "../../../core/services/interfaces/category.service";
import {CategoryResponse} from "../../../core/models/category-response";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePostRequest} from "../../../core/models/create-post-request";
import {IApplicationService} from "../../../core/services/interfaces/application.service";
import {IImageService} from "../../../core/services/interfaces/image.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  isLoading = true;
  currentPost: PostResponse | undefined;
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

  editPostForm: FormGroup | undefined;

  constructor(private route: ActivatedRoute, private postService: IPostService,
              private categoryService: ICategoryService, private applicationService: IApplicationService,
              private imageService: IImageService) {
    this.editPostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)]),
      htmlContent: new FormControl('', [Validators.required, Validators.minLength(1)]),
      categoryName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      console.log(params);
      let currentPostId = parseInt(params['postId']);
      try {
        this.currentPost = await this.postService.retrievePostById(currentPostId);
        this.categories = await this.categoryService.retrieveAll();
      } catch (err) {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 404) {
            throw err;
          }
        }
      }
      this.isLoading = false;

      this.title.setValue(this.currentPost?.title);
      this.description.setValue(this.currentPost?.description);
      this.htmlContent.setValue(this.currentPost?.htmlContent);
      this.category.setValue(this.currentPost?.category.name);
    });
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
    let createPostRequest: CreatePostRequest = {
      title: this.title.value,
      htmlContent: this.htmlContent.value,
      description: this.description.value,
      imageName: this.getImageName(),
      authorUsername: this.applicationService.loggedUser.username,
      category: this.category.value
    };

    console.log(createPostRequest);

    try {
      this.isPostCreationStarted = true;
      if (this.currentPost) {
        await this.postService.editPost(createPostRequest, this.currentPost.id);
        await Swal.fire({
          titleText: 'Článek je úspěšně upraven.',
          icon: 'success',
          confirmButtonText: 'Zavřít'
        });
      }
      this.isPostCreated = true;
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        await Swal.fire({
          titleText: 'Článek nemohl být upraven. Je možné že článek s daným jménem již existuje.',
          icon: 'error',
          confirmButtonText: 'Zavřít'
        });
        this.isPostCreatedError = true;
        return;
      }
    }

    if (this.currentFile) {
      await this.upload();
    }
  }

  private getImageName(): string {
    if (this.currentFile) {
      return this.getFileKebabCaseName();
    } else if (this.currentPost) {
      let lastSlashIndex = this.currentPost.thumbnailUrl.lastIndexOf('/');
      return this.currentPost.thumbnailUrl.substring(lastSlashIndex + 1);
    } else {
      return '';
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
    return <FormControl>this.editPostForm?.get('title');
  }

  get description(): FormControl {
    return <FormControl>this.editPostForm?.get('description');
  }

  get htmlContent(): FormControl {
    return <FormControl>this.editPostForm?.get('htmlContent');
  }

  get category(): FormControl {
    return <FormControl>this.editPostForm?.get('categoryName');
  }
}
