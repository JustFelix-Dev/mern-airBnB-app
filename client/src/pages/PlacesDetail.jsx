import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import Gallery from "../components/Gallery";
import AddressLink from "../components/AddressLink";
import { TbClockBolt, TbWorldLongitude, TbWorldLatitude } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { motion, AnimatePresence } from "framer-motion";

const PlacesDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const myApi = "f5fb28c0d0dd7eefc82f52937d88b038";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      console.log(data);
      setPlace(data);
      setIsLoading(false);
    });
  }, [id]);

  const getWeather = (cityName) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApi}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWeather(place?.address);
  }, [place]);

  console.log("Weather:", weather);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="h-[80vh] w-full flex items-center justify-center bg-white"
          >
            <div className="newtons-cradle index">
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && place && (
        <div className="mt-4 max-w-5xl shadow-lg  mx-auto px-2 sm:px-8 pt-8">
          <h1 className=" mb-4 text-lg sm:text-xl md:text-3xl md:mb-0">
            {place.title}
          </h1>
          <AddressLink>{place.address}</AddressLink>
          <Gallery place={place} />
          <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div className="">
              <div className="my-4">
                <h2 className="font-semibold text-2xl"> Description :</h2>
                <p>{place.description || "No description available"}</p>
              </div>
              <div className="bg-primary rounded-xl flex flex-col gap-2 max-w-xs  py-4 px-4 text-white font-medium">
                <p className="bg-white text-black w-auto px-2 py-1 rounded-md">
                  Check-In: {place.checkIn}
                </p>
                <p className="bg-white text-black w-auto px-2 py-1 rounded-md">
                  Check-Out: {place.checkOut}
                </p>
                <p className="bg-white text-black w-auto px-2 py-1 rounded-md">
                  Max No. of Guests: {place.guests}
                </p>
              </div>
            </div>
            <div className="flex  items-center">
              <BookingWidget place={place} />
            </div>
          </div>
          <div className="bg-white  mx-0 sm:-mx-8 px-1 sm:px-8 py-8 border-t">
            <div className="flex flex-col sm:flex-row  items-center sm:justify-between gap-4">
              <div className="border-b">
                {weather && weather.weather ? (
                  <>
                    <div className="flex gap-6 border-b pb-4">
                      <div>
                        <img
                          src={`/images/${weather?.weather?.[0].main}.png`}
                          alt="weatherIcon"
                          height={150}
                          width={150}
                        />
                      </div>
                      <div className="self-center">
                        <h1 className="text-3xl font-semibold mb-8">
                          {`${weather?.main?.temp}`} &deg;C
                        </h1>
                        <span className="text-lg font-medium">
                          {weather?.weather?.[0].main} |{" "}
                          {weather?.weather?.[0].description}
                        </span>
                        <h1 className="text-md">
                          {weather?.name} , {weather?.sys?.country}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-wrap pt-2 font-medium">
                      <span className="flex-[40%]">
                        <span className="flex items-center gap-1">
                          Pressure
                          <TbClockBolt />: {weather?.main?.pressure}Pa
                        </span>
                      </span>
                      <span className="flex-[40%]">
                        <span className="flex items-center gap-1">
                          Humidity
                          <WiHumidity /> : {weather?.main?.humidity} g.m-3
                        </span>
                      </span>
                      <span className="flex-[40%]">
                        <span className="flex items-center gap-1">
                          Longitude
                          <TbWorldLongitude /> : {weather?.coord?.lon}&deg;
                        </span>
                      </span>
                      <span className="flex-[40%]">
                        <span className="flex items-center gap-1">
                          Latitude
                          <TbWorldLatitude /> : {weather?.coord?.lat}&deg;
                        </span>
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ opacity: 0.2, scale: 0.9 }}
                      animate={{ opacity: 0.9, scale: 1 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <img
                        src="/images/unknown.png"
                        alt="icon"
                        height={45}
                        width={45}
                      />
                    </motion.div>
                    <span className="font-semibold text-lg md:text-xl max-w-[20ch]">
                      Oops! Weather Forecast not available at the moment!.
                    </span>
                  </div>
                )}
              </div>
              <div className="">
                <h2 className="text-lg sm:text-2xl font-bold">
                  What this Place has to Offer You:
                </h2>
                <div className="flex  items-center justify-center p-4 flex-wrap gap-4 max-w-sm">
                  {place.perks &&
                    place.perks.map((perk, idx) => (
                      <div
                        key={idx}
                        className=" flex-[40%] flex gap-2  items-center"
                      >
                        <img
                          src={`/images/${perk}.png`}
                          alt="wifiIcon"
                          height={20}
                          width={20}
                        />
                        <span className="text-lg sm:text-xl capitalize">
                          {perk}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="mt-4 py-4 border-t">
              <h2 className="text-xl font-bold"> Extra info:</h2>
            </div>
            <div className=" mb-3 md:mt-2 text-sm text-gray-900 leading-5">
              <p className="text-lg">{place.extraInfo}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlacesDetail;
