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
          <Slider {...sliderSettings} className={`image-slider`}>
            {thisProduct.GalleryImgs.map((image, index) => (
              <div className="image-holder" key={index}>
                <picture>
                  <img
                    width="100"
                    height="100"
                    src={`${imgUrlCheck(image.url)}`}
                    alt="Black Checked Saree"
                  />
                </picture>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="product-images-holder">
          {/* {thisProduct.GalleryImgs.map((image, index) => (
            <div className="image-holder" key={index}>
              <GlassMagnifier
                imageSrc={`${imgUrlCheck(image.url)}`}
                imageAlt={thisProduct.name}
                largeImageSrc={`${imgUrlCheck(image.url)}`}
                magnifierSize="50%"
              />
            </div>
          ))} */}
          <ProductGallery
            GalleryImgs={thisProduct.GalleryImgs}
            product={thisProduct.name}
          />
        </div>
      )}
    </>
  );
}
