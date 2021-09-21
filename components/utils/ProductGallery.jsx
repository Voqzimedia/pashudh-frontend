import { useState } from "react";
import { GlassMagnifier } from "react-image-magnifiers";
import { imgUrlCheck } from "../../helper/functions";

const ProductGallery = ({ GalleryImgs, product, gallery }) => {
  const [mainImg, setMainImg] = useState(
    gallery ? (gallery?.main ? gallery?.main : GalleryImgs[0]) : GalleryImgs[0]
  );

  //   console.log(gallery);

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
      {gallery ? (
        <div className="thumbnail-holder">
          {gallery?.main && (
            <div className="thumb" onClick={() => setMainImg(gallery?.main)}>
              <div className="image-holder">
                <img
                  src={`${imgUrlCheck(gallery?.main?.formats?.thumbnail?.url)}`}
                  alt={`${product}${gallery?.main?.id}`}
                />
              </div>
              <div className="title">
                <p>Saree</p>
              </div>
            </div>
          )}
          {gallery?.pallu && (
            <div className="thumb" onClick={() => setMainImg(gallery?.pallu)}>
              <div className="image-holder">
                <img
                  src={`${imgUrlCheck(
                    gallery?.pallu?.formats?.thumbnail?.url
                  )}`}
                  alt={`${product}${gallery?.pallu?.id}`}
                />
              </div>
              <div className="title">
                <p>Pallu</p>
              </div>
            </div>
          )}
          {gallery?.border && (
            <div className="thumb" onClick={() => setMainImg(gallery?.border)}>
              <div className="image-holder">
                <img
                  src={`${imgUrlCheck(
                    gallery?.border?.formats?.thumbnail?.url
                  )}`}
                  alt={`${product}${gallery?.border?.id}`}
                />
              </div>
              <div className="title">
                <p>Border</p>
              </div>
            </div>
          )}
          {gallery?.blouse && (
            <div className="thumb" onClick={() => setMainImg(gallery?.blouse)}>
              <div className="image-holder">
                <img
                  src={`${imgUrlCheck(
                    gallery?.blouse?.formats?.thumbnail?.url
                  )}`}
                  alt={`${product}${gallery?.blouse?.id}`}
                />
              </div>
              <div className="title">
                <p>Blouse</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="thumbnail-holder">
          {GalleryImgs.map((image, index) => (
            <div
              className="thumb"
              key={index}
              onClick={() => setMainImg(image)}
            >
              <div className="image-holder">
                <img
                  src={`${imgUrlCheck(image?.formats?.thumbnail?.url)}`}
                  alt={`${product}${image?.id}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
