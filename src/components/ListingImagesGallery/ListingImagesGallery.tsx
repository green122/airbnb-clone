import React, {useRef, useState, Fragment} from 'react';
import ReactImageGallery from "react-image-gallery";
import {IImageRecord} from "../../types/models";
import styled from "styled-components";
import ImageGallery from 'react-image-gallery';
import Lightbox from "react-image-lightbox";

import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import "react-image-gallery/styles/css/image-gallery.css"

const SliderContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: gray;
    width: 560px;
    .slick-slider {
      width: 70%;
    }
    .slick-prev {
      left: 10px;
    }
    .slick-next {
      right: 10px;
    }
  `

interface ListingImagesGalleryProps {
  images: IImageRecord[];
}

const ListingImagesGallery = ({images}: ListingImagesGalleryProps) => {

  const [lightBoxImage, setLightBoxImage] = useState<number | null>(null);
  const currentListingImage = useRef<ReactImageGallery | null>(null);

  const onImageCLick = () => {
    const index = currentListingImage.current?.getCurrentIndex();
    setLightBoxImage(index == null ? null : index);
  }
  const galleryImages = images.map(image => ({original: image.url, thumbnail: image.urlPreview}));
  return (
    <Fragment>
      <SliderContainer>
        <ImageGallery
          ref={image => currentListingImage.current = image}
          items={galleryImages} thumbnailPosition="left"
          onClick={onImageCLick}/>
      </SliderContainer>
      {lightBoxImage !== null &&
      <Lightbox mainSrc={images[lightBoxImage].url} onCloseRequest={() => setLightBoxImage(null)}/>
      }
    </Fragment>
  );
};

export default ListingImagesGallery;