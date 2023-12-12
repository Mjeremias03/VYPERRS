import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="w-[60%] flex mx-auto justify-center items-center mt-32 bg-gray-500  h-0.5" />
      <footer className=" py-6 ">
        <div className="flex flex-col justify-center items-center  mx-auto py-4">
          <p className="font-alfa-slab-one">Gracias por tu visita</p>
          <div className="flex flex-wrap mt-9 justify-center items-center text-center">
            <ul className="list-inline flex flex-wrap gap-4 mb-4">
              <li className="list-inline-item">
                <a className="text-black font-alfa-slab-one hover:text-gray-900">
                  Privacy
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-black font-alfa-slab-one hover:text-gray-900">
                  Terms
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-black font-alfa-slab-one hover:text-gray-900">
                  Affiliates
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-black font-alfa-slab-one hover:text-gray-900">
                  Support
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-black font-alfa-slab-one hover:text-gray-900">
                  Blog
                </a>
              </li>
            </ul>

            {/* <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#" className="text-black hover:text-gray-900">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fa fa-google-plus"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fa fa-dribbble"></i>
              </a>
            </li>
          </ul> */}
          </div>
          <div className="flex flex-col  justify-center items-center">
            <p className="text-gray-600 text-sm uppercase">
              Follow us on social media
            </p>
            <div className="flex flex-wrap gap-4">
              <FaInstagram size="35" />
              <FaFacebookSquare size="35" />
            </div>
          </div>
          <div className="text-center text-gray-600 text-sm mt-5">
            &copy; 2019 Union - All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
