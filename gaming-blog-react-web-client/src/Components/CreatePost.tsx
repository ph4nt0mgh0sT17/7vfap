import React, {ChangeEvent, createRef, FC, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {CategoryResponse} from "../Responses/CategoryResponse";
import {CategoryService} from "../services/CategoryService";
import {LoadingSpinner} from "./LoadingSpinner";
import {ValidationError} from "./Dialogs/LoginDialog";
import {Alert, Button, LinearProgress} from "@mui/material";
import {CreatePostRequest} from "../Models/Requests/CreatePostRequest";
import {LoginResponse} from "../Models/Responses/LoginResponse";
import {useSelector} from "react-redux";
import {RootState} from "../state/reducers";
import {PostService} from "../services/PostService";
import Swal from "sweetalert2";
import {ImageService} from "../services/ImageService";

export const CreatePost: FC = () => {
    const [loading, setLoading] = useState(true);
    const [postCreated, setPostCreated] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStarted, setUploadStarted] = useState(false);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);
    const [currentImageSrc, setCurrentImageSrc] = useState<string | undefined>(undefined);

    const loggedUser: LoginResponse | null = useSelector((state: RootState) => state.application);

    // Form
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [currentCategory, setCurrentCategory] = useState<CategoryResponse | undefined>(undefined);
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postText, setPostText] = useState('');

    const categoryService = new CategoryService();
    const postService = new PostService();
    const imageService = new ImageService();

    useEffect(() => {
        categoryService.retrieveAll().then(response => {
            setCategories(response.data);
            setLoading(false);
        })
    }, [])

    const validateCategory = (validationErrors: ValidationError[]) => {
        if (currentCategory === undefined) {
            validationErrors.push({
                name: 'currentCategory',
                errorText: 'Kategorie článku musí být zvolena'
            });
        }
    }

    const validatePostTitle = (validationErrors: ValidationError[]) => {
        if (postTitle.length > 255 || postTitle.length === 0) {
            validationErrors.push({
                name: 'postTitle',
                errorText: 'Titulek článku nemůže být prázdný a nemůže být delší než 255 znaků.'
            });
        }
    }

    const validatePostDescription = (validationErrors: ValidationError[]) => {
        if (postDescription.length > 100 || postDescription.length === 0) {
            validationErrors.push({
                name: 'postDescription',
                errorText: 'Popis článku nemůže být prázdný a nemůže být delší než 100 znaků.'
            });
        }
    }

    const validatePostText = (validationErrors: ValidationError[]) => {
        if (postText.length === 0) {
            validationErrors.push({
                name: 'postText',
                errorText: 'Text článku nemůže být prázdný.'
            });
        }
    }

    const onPostSave = async () => {
        let currentValidationErrors: ValidationError[] = [];

        validateCategory(currentValidationErrors);
        validatePostTitle(currentValidationErrors);
        validatePostDescription(currentValidationErrors);
        validatePostText(currentValidationErrors);

        setValidationErrors(currentValidationErrors);

        if (currentValidationErrors.length > 0)
            return;

        if (loggedUser === null)
            return;

        if (currentCategory === undefined)
            return;


        const createPostRequest: CreatePostRequest = {
            title: postTitle,
            description: postDescription,
            htmlContent: postText,
            imageName: getFileKebabCaseName(),
            category: currentCategory.name,
            authorUsername: loggedUser.username
        }

        try {
            await postService.createPost(createPostRequest);
            await Swal.fire({
                titleText: 'Článek je úspěšně vytvořen.',
                icon: 'success',
                confirmButtonText: 'Zavřít'
            });

            await upload();

            setPostCreated(true);
        } catch (err) {
            await Swal.fire({
                titleText: 'Článek nemohl být vytvořen. Je možné že článek s daným jménem již existuje.',
                icon: 'error',
                confirmButtonText: 'Zavřít'
            });
            return;
        }
    }

    const upload = async () => {
        if (currentFile) {
            setUploadStarted(true);

            try {
                await imageService.upload(currentFile, getFileKebabCaseName(), (uploadProgressEvent) => {
                    console.log(uploadProgressEvent);
                    setUploadProgress(Math.round((100 * uploadProgressEvent.loaded) / uploadProgressEvent.total))
                })

                await Swal.fire({
                    titleText: 'Obrázek byl úspěšně nahrán do systému.',
                    icon: 'success',
                    confirmButtonText: 'Zavřít'
                });
            } catch (err) {
                await Swal.fire({
                    titleText: 'Obrázek nemohl být nahrán, protože obrázek s daným jménem je již v systému.',
                    icon: 'error',
                    confirmButtonText: 'Zavřít'
                });
            }
        }
    }

    const getFileKebabCaseName = (): string => {
        if (currentFile)
            return currentFile.name
                .replace(/([a-z])([A-Z])/g, "$1-$2")
                .replace(/[\s_]+/g, '-')
                .toLowerCase();
        else
            return '';
    }

    const handleChange = (event: any) => {
        setCurrentImageSrc(undefined);

        let file = event.target.files[0];
        setCurrentFile(file);

        if (file !== undefined && !fileIsNotImage(file)) {
            setCurrentImageSrc(URL.createObjectURL(file));
        }
    };

    const fileIsTooBig = (): boolean => {
        if (currentFile === undefined)
            return true;

        // The image file cannot be larger than 2MB.
        return currentFile.size > 2097152
    }

    const fileIsNotImage = (file: File): boolean => {
        if (file === undefined)
            return true;

        return file.type.match(/image\/*/) === null;
    }

    return (
        <div className="pb-4">
            <h1>Vytvoření nového článku</h1>
            <LoadingSpinner title={'Načítám data...'} isLoading={loading}/>

            {!loading && !postCreated &&
                <React.Fragment>
                    <div className="row">
                        <div className="col mb-3">
                            <Button variant="contained">
                                <input
                                    type="file"
                                    onChange={handleChange}/>
                            </Button>

                            {currentFile !== undefined && fileIsTooBig() &&
                                <div className="col-12 alert alert-danger mt-3">
                                    Soubor přesahuje 2 MB. Soubor má: {(currentFile.size / 1024 / 1024)} MB
                                </div>
                            }

                            {currentFile !== undefined && fileIsNotImage(currentFile) &&
                                <div className="col-12 alert alert-danger mt-3">
                                    Daný soubor musí být obrázek (.jpg, .png, atd...).
                                </div>
                            }
                        </div>
                    </div>

                    {currentImageSrc !== undefined &&
                        <div className="row">
                            <img className="img-thumbnail mb-4" srcSet={currentImageSrc} alt="Thumbnail"/>

                            {uploadStarted &&
                                <div className="container">
                                    <LinearProgress className="mb-3 rounded-2 container" style={{height: '10px'}}
                                                    variant="determinate" value={uploadProgress}/>
                                </div>
                            }
                        </div>
                    }
                    <div className="row mb-2">
                        <TextField
                            select
                            onChange={(event) => setCurrentCategory(categories.find(x => x.name === event.target.value))}
                            error={validationErrors.find(x => x.name === 'currentCategory') !== undefined}
                            helperText={validationErrors.find(x => x.name === 'currentCategory') !== undefined ? validationErrors.find(x => x.name === 'currentCategory')?.errorText : ''}
                            label="Kategorie">
                            {categories.map(currentCategory => (
                                <MenuItem key={currentCategory.name} value={currentCategory.name}>
                                    {currentCategory.name}
                                </MenuItem>
                            ))
                            }
                        </TextField>
                    </div>

                    <div className="row mb-3">
                        <TextField
                            required
                            value={postTitle}
                            onChange={(event) => setPostTitle(event.target.value)}
                            error={validationErrors.find(x => x.name === 'postTitle') !== undefined}
                            helperText={validationErrors.find(x => x.name === 'postTitle') !== undefined ? validationErrors.find(x => x.name === 'postTitle')?.errorText : ''}
                            label="Vložte titulek článku"
                            variant="outlined"/>
                    </div>

                    <div className="row mb-3">
                        <TextField
                            required
                            value={postDescription}
                            onChange={(event) => setPostDescription(event.target.value)}
                            error={validationErrors.find(x => x.name === 'postDescription') !== undefined}
                            helperText={validationErrors.find(x => x.name === 'postDescription') !== undefined ? validationErrors.find(x => x.name === 'postDescription')?.errorText : ''}
                            label="Vložte popisek článku"
                            variant="outlined"/>
                    </div>

                    <div className="row mb-3">
                        <TextField
                            required
                            multiline
                            rows={10}
                            value={postText}
                            onChange={(event) => setPostText(event.target.value)}
                            error={validationErrors.find(x => x.name === 'postText') !== undefined}
                            helperText={validationErrors.find(x => x.name === 'postText') !== undefined ? validationErrors.find(x => x.name === 'postText')?.errorText : ''}
                            label="Vložte text článku"
                            variant="outlined"/>
                    </div>

                    <div className="row mb-3">
                        <Button variant="contained" onClick={onPostSave}>Uložit článek</Button>
                    </div>
                </React.Fragment>
            }

            {postCreated &&
                <Alert severity="success" sx={{width: '100%'}}>
                    Článek vytvořen.
                </Alert>
            }
        </div>
    );
}