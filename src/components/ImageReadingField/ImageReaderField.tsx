import React, {ChangeEvent, useReducer, useEffect, useState} from "react";
import {Placeholder, Icon} from "semantic-ui-react";

import "./ImageReaderFile.css";
import update from "ramda/es/update";
import {IImageRecord, RawImage} from "../../types/models";

interface IImageReaderFieldProps {
  className?: string;
  onChange: (value: Array<RawImage | IImageRecord>) => void;
  value: RawImage[];
}

interface IImageFilesState {
  image: RawImage | IImageRecord;
  loading: boolean;
}

type ActionType = {
  type: "set_images",
  images: IImageFilesState[]
} | {
  type: "start_upload",
  uploadedNumber: number
} | {
  type: "success_upload",
  payload: {
    index: number;
    image: ArrayBuffer;
    file: File,
  };
} | {
  type: "delete_image",
  index: number
}

const imageReducer = (
  state: IImageFilesState[],
  action: ActionType
) => {
  switch (action.type) {
    case "set_images":
      return [...action.images]
    case "start_upload":
      return state.concat(
        Array(action.uploadedNumber).fill({image: null, loading: true})
      );
    case "success_upload":
      const newState = update(
        action.payload.index,
        {
          image: {
            image: action.payload.image,
            file: action.payload.file
          }, loading: false
        },
        state
      );
      return newState;
    case "delete_image":
      return state.filter((_, i) => i !== action.index);
    default:
      return state;
  }
};

function ImageReaderField({onChange, value: values}: IImageReaderFieldProps) {
  const [state, dispatch] = useReducer(
    imageReducer,
    values
      ? values.map(value => ({image: value, loading: false}))
      : []
  );

  const [fireChange, setFireChange] = useState<boolean | null>(null);

  useEffect(() => {
    if (!values) {
      return;
    }
    dispatch({type: "set_images", images: values.map(value => ({image: value, loading: false}))});
  }, [values])

  useEffect(() => {
    if (fireChange === null) {
      return;
    }
    onChange(state.map(record => record.image));
  }, [fireChange]);

  console.log(state);
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
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
      uploadedNumber: validatedFiles.length
    });

    async function readAndDispatch() {
      const imagePromises =  (validatedFiles || []).map(async (file, index) => {
          const result = await readUploadedFile(file);
          dispatch({
            type: "success_upload",
            payload: {
              index: index + state.length,
              file,
              image: result as ArrayBuffer
            }
          });
        }
      );
      await Promise.all(imagePromises);
    }

    await readAndDispatch();
    setFireChange(value => !value);
  };

  console.log(state);

  const srcString = (image: RawImage | IImageRecord) =>
    'urlPreview' in image ? image.urlPreview : URL.createObjectURL(image.file);

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
              <Icon size="big" name="delete" onClick={() => {
                dispatch({type: 'delete_image', index: key});
                setFireChange(value => !value);
              }}/>
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
