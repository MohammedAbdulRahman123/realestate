import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <Metadata title="About" description="About page" />

      <div className="p-5">
        <h1 className="mb-2 text-3xl font-bold">Quinnstheprinters.com Team</h1>
        <div
          className="relative h-60 w-full bg-cover bg-center"
          style={{ backgroundImage: `url('your-background-image-url')` }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center text-white">
              <p className="mb-4">
                We strive to offer you a consistently superior service
                throughout your experience with us.
              </p>
              <button className="rounded bg-green-500 px-4 py-2 text-white">
                Join Our Team
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="mb-6 text-xl font-semibold">DIRECTORS</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <img
                src="your-image-url"
                alt="Caroline Arthur"
                className="mx-auto mb-4 h-40 w-40 rounded-full"
              />
              <h3 className="font-medium">Caroline Arthur</h3>
              <p className="text-gray-500">Client Services Director</p>
            </div>
            <div className="text-center">
              <img
                src="your-image-url"
                alt="Finn Mount"
                className="mx-auto mb-4 h-40 w-40 rounded-full"
              />
              <h3 className="font-medium">Finn Mount</h3>
              <p className="text-gray-500">Sales Director</p>
            </div>
            <div className="text-center">
              <img
                src="your-image-url"
                alt="Dominique Walsh"
                className="mx-auto mb-4 h-40 w-40 rounded-full"
              />
              <h3 className="font-medium">Dominique Walsh</h3>
              <p className="text-gray-500">Finance Director</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
