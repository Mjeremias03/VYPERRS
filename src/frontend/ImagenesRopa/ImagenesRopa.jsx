const ImagenesRopa = () => {
    return (
      <div className="mt-44 bg-transparent">
        <div className="grid grid-cols-2">
          {/* First Image */}
          <div className="relative">
            <a
              href="/products"
              className="absolute text-center top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer"
            >
              <h1 className="font-bold text-4xl text-white">BERMUDAS</h1>
              <h1 className="font-bold text-white">VER MAS</h1>
            </a>
            <img
              src="/bermuda.jfif"
              alt=""
              className="w-full h-[600px]  cursor-pointer"
            />
          </div>
  
          {/* Second Image */}
          <div className="relative">
            <a
              href="/products"
              className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer"
              
            >
                 <h1 className="font-bold text-4xl text-white">MUSCULOSAS</h1>
              <h1 className="font-bold text-center text-white ">VER MAS</h1>
                </a>
              <img
                src="/muscu.jfif"
                alt=""
                className="w-full h-[600px] cursor-pointer"
              />
            
          </div>
        </div>
      </div>
    );
  };
  
  export default ImagenesRopa;
  