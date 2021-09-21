import { useState } from "react";
import { GlassMagnifier } from "react-image-magnifiers";
import { imgUrlCheck } from "../../helper/functions";

const ProductGallery = ({ GalleryImgs, product }) => {
  const [mainImg, setMainImg] = useState(GalleryImgs[0]);

  return (
    <div className="gallery-holder">
      <div className="main-img">
        <div className="image-holder">
          <GlassMagnifier
            imageSrc={`${imgUrlCheck(mainImg.url)}`}
            imageAlt={product}
            largeImageSrc={`${imgUrlCheck(mainImg.url)}`}
            magnifierSize="50%"
          />
        </div>
      </div>
      <div className="thumbnail-holder">
        {GalleryImgs.map((image, index) => (
          <div className="thumb" key={index} onClick={() => setMainImg(image)}>
            <div className="image-holder">
              <img
                src={`${imgUrlCheck(image.url)}`}
                alt={`${product}${image?.id}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
