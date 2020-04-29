import React from 'react'
import './styles/AboutUs.css'
import SlideCompanion from './components/SlideCompanion'
import SlideSponsor from './components/SlideSponsor'
import clb from '../../assets/clb.JPG'
export const AboutUs = () => {
  return (
    <div className='row about-us'>
      <div className='view-clb'>
        <img src={clb} alt='clb' />
        <a
          href='https://www.facebook.com/clubproptit'
          className='view-page'
          target='_blank'
        >
          CLB Lập Trình PTIT
        </a>
      </div>
      <div className='sponsor'>
        <h3>Sponsors</h3>
        <SlideSponsor />
      </div>
      <div className='companion'>
        <h3>Contributors</h3>
        <SlideCompanion />
      </div>
    </div>
  )
}
