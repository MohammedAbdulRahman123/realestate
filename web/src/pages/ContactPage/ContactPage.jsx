import { Link } from '@redwoodjs/router'

const ContactPage = () => {
  return (
    <>
      <div className="p-5">
        <h1 className="mb-2 text-3xl font-bold">Contact information</h1>
        <h2 className="mb-4 text-2xl font-semibold">JustPrint</h2>
        <h3 className="mb-6 text-xl font-medium">Contact Numbers:</h3>
        <div className="flex flex-wrap gap-8">
          <div className="min-w-[200px] flex-1">
            <h4 className="mb-2 text-lg font-medium text-gray-500">
              Republic of Ireland
            </h4>
            <p>0044 28 9032 3552</p>
            <p>048 9032 3552</p>
          </div>
          <div className="min-w-[200px] flex-1">
            <h4 className="mb-2 text-lg font-medium text-gray-500">
              Northern Ireland
            </h4>
            <p>028 9032 3552</p>
            <p>028 9032 9748 (fax)</p>
          </div>
          <div className="min-w-[200px] flex-1">
            <h4 className="mb-2 text-lg font-medium text-gray-500">
              United Kingdom
            </h4>
            <p>
              Call the office if you need to arrange collection on 028 90 323552
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-5">
        <iframe
          title="Northern Ireland Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d315137.3008033329!2d-6.095460402229916!3d54.60786844557295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4860ff8b9987196d%3A0x6e1aef4fbc315346!2sNorthern%20Ireland!5e0!3m2!1sen!2suk!4v1597197087367!5m2!1sen!2suk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </>
  )
}

export default ContactPage
