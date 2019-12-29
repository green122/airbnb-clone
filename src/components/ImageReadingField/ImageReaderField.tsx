import React, {ChangeEvent, useReducer, useEffect} from "react";
import {Placeholder, Icon} from "semantic-ui-react";

import "./ImageReaderFile.css";
import update from "ramda/es/update";

interface IImageReaderFieldProps {
  className?: string;
  onChange: (value: any) => void;
  value: Array<ArrayBuffer | string>;
}

interface IImageFilesState {
  image?: ArrayBuffer | string | null;
  file?: File | Blob,
  loading: boolean;
}

const imageReducer = (
  state: IImageFilesState[],
  action: {
    type: string;
    payload: {
      index?: number;
      image?: ArrayBuffer;
      file?: Blob | File,
      uploadedFilesNumber?: number;
    };
  }
) => {
  const {type, payload} = action;
  switch (type) {
    case "start_upload":
      return state.concat(
        Array(payload.uploadedFilesNumber).fill({image: null, loading: true})
      );
      break;
    case "success_upload":
      return update(
        payload.index!,
        {image: payload.image, file: payload.file, loading: false},
        state
      );
      break;
    case "deleteImage":
      return state.filter((_, i) => i !== payload.index);
      break;
    default:
      return state;
  }
};

function ImageReaderField({onChange, value: values}: IImageReaderFieldProps) {
  const [state, dispatch] = useReducer(
    imageReducer,
    values ? values.map(value => ({image: value, loading: false})) : []
  );

  useEffect(() => {
    onChange(state);
  }, [state]);

  console.log(state);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {files} = event.target;
    if (!files) {
      return;
    }
    const [errors, validatedFiles] = validateImages(files);
    if (errors.length) {
      console.log(errors);
    }
    if (!validatedFiles) {
      return;
    }

    dispatch({
      type: "start_upload",
      payload: {uploadedFilesNumber: validatedFiles.length}
    });

    validatedFiles.forEach((file, index) =>
      readUploadedFile(file).then(receivedData =>
        dispatch({
          type: "success_upload",
          payload: {
            index: index + state.length,
            file,
            image: receivedData as ArrayBuffer
          }
        })
      )
    );
  };

  console.log(state);

  const srcString = (imageFile?: string | ArrayBuffer | null) =>
    typeof imageFile === "string" ? imageFile : URL.createObjectURL(imageFile);

  return (
    <div className="upload-container">
      <input
        className="input-file"
        type="file"
        multiple={true}
        id="upload-image"
        onChange={handleImageChange}
      />
      <label htmlFor="upload-image">
        <div className="upload-label">
          <Icon className="upload-icon__upload" size="big" name="photo"/>
        </div>
      </label>
      {state.filter(Boolean).map(({image, loading}, key) =>
        loading ? (
          <Placeholder className="image-placeholder">
            <Placeholder.Image/>
          </Placeholder>
        ) : (
          <div className="upload-image__container">
            <img key={key} className="upload-image" src={srcString(image)}/>
            <div className="upload-image-menu">
              <Icon size="big" name="delete" onClick={() => dispatch({type: 'deleteImage', payload: {index: key}})}/>
            </div>
          </div>
        )
      )}
    </div>
  );
}

const readUploadedFile = (inputFile: File) => {
  const temporaryFileReader = new FileReader();

  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onprogress = ev => {
      console.log(ev.loaded);
    };

    temporaryFileReader.onloadend = () => {
      resolve(temporaryFileReader.result as ArrayBuffer);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

function validateImages(
  selectedFiles: FileList
): [string | string[], File[] | null] {
  // 1. check if file type is image
  const imagesFiles = Array.from(selectedFiles).filter(({type}) =>
    type.includes("image")
  );
  const errors: string[] = [];
  if (imagesFiles.length !== selectedFiles.length) {
    errors.push("Not image file selected");
  }

  return [errors, imagesFiles];
}

export default ImageReaderField;
