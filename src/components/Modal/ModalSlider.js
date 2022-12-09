import 'slick-carousel/slick/slick.css'

import React from 'react'
import Slider from 'react-slick'

const ModalSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <Slider {...settings}>
      {images.map(image => (
        <img src={image} key={image} alt='' />
      ))}
    </Slider>
  )
}

export default ModalSlider