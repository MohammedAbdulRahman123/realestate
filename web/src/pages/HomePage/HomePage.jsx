import { Carousel } from 'react-responsive-carousel'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { FaTruck, FaThumbsUp, FaClock, FaTags, FaBox } from 'react-icons/fa'
import FeaturesSection from 'src/components/Home/FeaturesSection/FeaturesSection'
import PopularProducts from 'src/components/Home/PopularProducts/PopularProducts'
const HomePage = () => {
  const images = ['/h1.jpeg', '/h2.jpeg', '/h3.jpeg']
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={500}
      >
        {images.map((image, index) => (
          <div key={index} className="h-64 overflow-hidden">
            {' '}
            {/* Adjust the height as needed */}
            <img
              src={image}
              alt={`Carousel ${index + 1}`}
              className="h-full w-full "
            />
          </div>
        ))}
      </Carousel>
      <div>
        <PopularProducts />
      </div>

      <div>
        <FeaturesSection />
      </div>

    </>
  )
}

export default HomePage
