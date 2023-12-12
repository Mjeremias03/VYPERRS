import { useState } from "react";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [subscribeToNotifications, setSubscribeToNotifications] =
    useState(false);

  useEffect(() => {
    const timeid = setTimeout(() => {
      setSubscribeToNotifications(true);
    }, 7000);

    return () => clearTimeout(timeid);
  }, []);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribeChange = (event) => {
    setSubscribeToNotifications(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes enviar el formulario a tu servidor o hacer lo que necesites con la información.
    console.log("Email:", email);
    console.log("Suscripción a notificaciones:", subscribeToNotifications);
  };
  const handleSubscribeClose = () => {
    setSubscribeToNotifications(false);
  };
  return (
    <div className="h-[500px] bg-white flex justify-center items-center">
      {subscribeToNotifications && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center z-50"
          style={{ zIndex: 1000 }}
        >
          <div className="bg-white p-3 grid grid-cols-2 rounded shadow-lg relative">
            <button
              onClick={handleSubscribeClose}
              className="absolute top-2 right-2 text-2xl text-black cursor-pointer"
            >
              <IoMdClose size="30" className="text-red " />
            </button>
            <div className="w-1/2 flex">
            <img src="suscribe.jfif" className="h-full items-center justify-center w-full" alt="" />
            </div>
            <form onSubmit={handleSubmit} className=" w-full justify-center items-center">
            <h1 className="text-4xl mb-4 text-black">¡Suscríbete ahora!</h1>
            <p className="text-black">
              Recibe notificaciones, ofertas y beneficios exclusivos.
            </p>
              <label htmlFor="email" className=" mb-2">
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Su email"
                className="w-full p-2 text-black mb-4 border border-solid border-black rounded"
                required
              />
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Suscribirse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
     <form className="max-w-md mx-auto p-8 bg-white rounded shadow-md">
  <h1 className="text-3xl font-semibold text-center mb-6 text-black">¡Únete a nuestra Newsletter!</h1>
  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
    Correo Electrónico:
  </label>
  <input
    type="email"
    id="email"
    name="email"
    value={email}
    onChange={handleEmailChange}
    placeholder="TuCorreo@ejemplo.com"
    className="w-full border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:border-blue-500"
    required
  />

  <div className="flex items-center justify-center">
    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-all"
    >
      Suscribirse
    </button>
  </div>
</form>

    </div>
  );
};

export default Subscribe;
