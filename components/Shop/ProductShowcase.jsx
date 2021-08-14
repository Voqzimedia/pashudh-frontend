// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"));
import { GlassMagnifier } from "react-image-magnifiers";
// import ReactImageMagnify from "react-image-magnify";

export default function ProductShowcase({ isMobile, thisProduct }) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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
                    src={`${
                      process.env.NODE_ENV === "development"
                        ? process.env.NEXT_PUBLIC_API_URL
                        : ""
                    }${image.url}`}
                    alt="Black Checked Saree"
                  />
                </picture>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="product-images-holder">
          {thisProduct.GalleryImgs.map((image, index) => (
            <div className="image-holder" key={index}>
              <GlassMagnifier
                imageSrc={`${
                  process.env.NODE_ENV === "development"
                    ? process.env.NEXT_PUBLIC_API_URL
                    : ""
                }${image.url}`}
                imageAlt={thisProduct.name}
                largeImageSrc={`${
                  process.env.NODE_ENV === "development"
                    ? process.env.NEXT_PUBLIC_API_URL
                    : ""
                }${image.url}`}
                magnifierSize="50%"
              />
              {/* <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: thisProduct.name,
                    isFluidWidth: true,
                    src: `${
                      process.env.NODE_ENV === "development"
                        ? process.env.NEXT_PUBLIC_API_URL
                        : ""
                    }${image.url}`,
                  },
                  largeImage: {
                    src: `${
                      process.env.NODE_ENV === "development"
                        ? process.env.NEXT_PUBLIC_API_URL
                        : ""
                    }${image.url}`,
                    width: 1200,
                    height: 1800,
                  },
                }}
                enlargedImageContainerStyle={{
                  left: "auto",
                  right: "0",
                }}
              /> */}
              {/* <picture>
                <img
                  width="100"
                  height="100"
                  src={`${
                    process.env.NODE_ENV === "development"
                      ? process.env.NEXT_PUBLIC_API_URL
                      : ""
                  }${image.url}`}
                  alt="Black Checked Saree"
                />
              </picture> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
