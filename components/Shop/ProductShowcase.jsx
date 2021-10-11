// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"));
// import { GlassMagnifier } from "react-image-magnifiers";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { imgUrlCheck } from "../../helper/functions";
import ProductGallery from "../utils/ProductGallery";
import { useState } from "react";
import SvgIcon from "../utils/SvgIcon";
import { icons } from "feather-icons";
// import ReactImageMagnify from "react-image-magnify";

export const FullBtn = ({ openFull, img }) => {
  return (
    <button onClick={() => openFull(img)} className="btn full-screen-btn">
      <SvgIcon icon={icons.maximize.toSvg()} />
    </button>
  );
};

export default function ProductShowcase({ isMobile, thisProduct }) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const [fullScreenImg, setFullScreenImg] = useState(
    thisProduct?.gallery?.main
      ? thisProduct?.gallery?.main
      : thisProduct?.GalleryImgs?.[0]
  );

  const handle = useFullScreenHandle();

  const openFull = (img) => {
    setFullScreenImg(img);
    handle.enter();
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
                  <FullBtn
                    openFull={openFull}
                    img={thisProduct?.gallery?.main}
                  />
                </div>
              )}
              {thisProduct?.gallery?.pallu && (
                <div className="image-holder">
                  <img
                    src={`${imgUrlCheck(thisProduct?.gallery?.pallu?.url)}`}
                    alt={`${thisProduct?.name}${thisProduct?.gallery?.pallu?.id}`}
                  />
                  <FullBtn
                    openFull={openFull}
                    img={thisProduct?.gallery?.pallu}
                  />
                </div>
              )}
              {thisProduct?.gallery?.border && (
                <div className="image-holder">
                  <img
                    src={`${imgUrlCheck(thisProduct?.gallery?.border?.url)}`}
                    alt={`${thisProduct?.name}${thisProduct?.gallery?.border?.id}`}
                  />
                  <FullBtn
                    openFull={openFull}
                    img={thisProduct?.gallery?.border}
                  />
                </div>
              )}
              {thisProduct?.gallery?.blouse && (
                <div className="image-holder">
                  <img
                    src={`${imgUrlCheck(thisProduct?.gallery?.blouse?.url)}`}
                    alt={`${thisProduct?.name}${thisProduct?.gallery?.blouse?.id}`}
                  />
                  <FullBtn
                    openFull={openFull}
                    img={thisProduct?.gallery?.blouse}
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
                  <FullBtn openFull={openFull} img={image} />
                </div>
              ))}
            </Slider>
          )}
          <div className="full-screen-holder">
            <FullScreen handle={handle}>
              <div className="full-screen-inner">
                <div className="full-header">
                  <button className="btn close" onClick={() => handle.exit()}>
                    <SvgIcon icon={icons.x.toSvg()} />
                  </button>
                </div>
                <div className="image-hoolder">
                  <picture>
                    <img src={`${imgUrlCheck(fullScreenImg.url)}`} alt="full" />
                  </picture>
                </div>
              </div>
            </FullScreen>
          </div>
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
