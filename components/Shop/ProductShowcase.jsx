// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"));
import { GlassMagnifier } from "react-image-magnifiers";

import { imgUrlCheck } from "../../helper/functions";
import ProductGallery from "../utils/ProductGallery";
// import ReactImageMagnify from "react-image-magnify";

export default function ProductShowcase({ isMobile, thisProduct }) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <>
      {isMobile ? (
        <div className="product-images-slider">
          {thisProduct?.gallery ? (
            <Slider {...sliderSettings} className={`image-slider`}>
              {thisProduct?.gallery?.main && (
                <div className="image-holder">
                  <img
                    src={`${imgUrlCheck(thisProduct?.gallery?.main?.url)}`}
                    alt={`${thisProduct?.name}${thisProduct?.gallery?.main?.id}`}
                  />
                </div>
              )}
              {thisProduct?.gallery?.pallu && (
                <div className="image-holder">
                  <img
                    src={`${imgUrlCheck(thisProduct?.gallery?.pallu?.url)}`}
                    alt={`${thisProduct?.name}${thisProduct?.gallery?.pallu?.id}`}
                  />
                </div>
              )}
              {thisProduct?.gallery?.border && (
                <div className="image-holder">
                  <img
                    src={`${imgUrlCheck(thisProduct?.gallery?.border?.url)}`}
                    alt={`${thisProduct?.name}${thisProduct?.gallery?.border?.id}`}
                  />
                </div>
              )}
              {thisProduct?.gallery?.blouse && (
                <div className="image-holder">
                  <img
                    src={`${imgUrlCheck(thisProduct?.gallery?.blouse?.url)}`}
                    alt={`${thisProduct?.name}${thisProduct?.gallery?.blouse?.id}`}
                  />
                </div>
              )}
            </Slider>
          ) : (
            <Slider {...sliderSettings} className={`image-slider`}>
              {thisProduct.GalleryImgs.map((image, index) => (
                <div className="image-holder" key={index}>
                  <picture>
                    <img
                      width="100"
                      height="100"
                      src={`${imgUrlCheck(image.url)}`}
                      alt={`${thisProduct?.name}${image?.id}`}
                    />
                  </picture>
                </div>
              ))}
            </Slider>
          )}
        </div>
      ) : (
        <div className="product-images-holder">
          <ProductGallery
            GalleryImgs={thisProduct?.GalleryImgs}
            product={thisProduct?.name}
            gallery={thisProduct?.gallery}
          />
        </div>
      )}
    </>
  );
}
