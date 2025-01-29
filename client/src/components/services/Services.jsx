import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "./slice/serviceSlice";
import { getAllServices } from "./Api/serviceApi";

const ServicePage = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);


  const fetchServices = async () => {
    try {
      const data = await getAllServices();
      console.log(data);
      dispatch(setServices(data.services));
    } catch (error) {
      console.error("Failed to fetch services:", error.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Services</h1>
      {services?.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {services?.map((service) => (
            <div
              key={service?._id}
              className="max-w-xs w-full border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 mx-auto"
            >
              <div className="w-full h-40 bg-gray-200">
                <img
                  src={service?.avatar}
                  alt={service?.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {service?.title}
                </h2>
                <p className="text-gray-600 mb-4">{service?.description}</p>
                <p className="text-lg font-bold text-blue-600">
                  ₹{service?.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicePage;
