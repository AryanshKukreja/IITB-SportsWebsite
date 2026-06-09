import React from 'react';
import { useState } from 'react';
import { MdDoubleArrow } from "react-icons/md";


const FitnessClub = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [process.env.PUBLIC_URL + '/images/sports-logo-transparent.png'];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className='aq-pageContainer'>
      <div className='titleText'>
        Fitness Club
      </div>

      <div className='aq-about'>
        XYZ
      </div>

      <div className='facilities'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Facilities</h3>
        </div>
        <div className='content'>
          <p className='facilityText'>
            XYZ
          </p>
        </div>
      </div>

      <div className='achievements'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Achievements</h3>
        </div>
        <div className='content'>
          <p className='facilityText'></p>
        </div>
      </div>

      <div className='contacts'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Contact</h3>
        </div>
        <div className='contactlist'>
          <div className='contactCard'>
            <img alt="alt" className='contactImg' />
            <p className='aq-name'>Name</p>
            <p className='info'>Institute Fitness Club Secretary</p>
            <p className='info'>+91 XXXX</p>
          </div>
        </div>
      </div>

      <div className='gallery'>
        <div className='aq-heading'>
          <MdDoubleArrow className='arrow' />
          <h3 className='aq-headingtext'>Gallery</h3>
        </div>
        <div className='new-gallery'>
          <img src={images[currentIndex]} alt="Gallery" className="gallery-image" />
          <div className="gallery-buttons">
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default FitnessClub;
