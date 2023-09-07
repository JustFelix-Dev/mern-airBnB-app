import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImEyePlus } from "react-icons/im";
import { SlCloudUpload } from "react-icons/sl";
import { HiOutlineTrash } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { AiOutlineStar, AiFillStar, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import Perks from "../components/Perks";
import PlacesImage from "../components/PlacesImage";

const LocationPages = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [fetchedPlaces, setFetchedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setFetchedPlaces(data);
    });
  }, [fetchedPlaces]);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/uploadByLink", { link: photoLink });
      const imageUrl = response.data;
      setPhotos((prev) => [...prev, imageUrl]);
      console.log(photos);
      console.log(response, imageUrl);
      setPhotoLink("");
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  const removePhoto = (e, file) => {
    e.preventDefault();
    setPhotos([...photos.filter((photo) => photo !== file)]);
  };

  const selectPhoto = (e, file) => {
    e.preventDefault();
    const photosnotSelected = photos.filter((photo) => photo !== file);
    const newPhotos = [file, ...photosnotSelected];
    setPhotos(newPhotos);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Presponse:", response);
        const { data: filename } = response;
        setPhotos((prev) => {
          return [...prev, ...filename];
        });
      })
      .catch((err) => {
        console.log("Err:", err);
      });
  };

  const handleFormPlaces = async (e) => {
    e.preventDefault();
    const formBody = {
      title,
      address,
      photos,
      photoLink,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    const { data } = await axios.post("/places", formBody);
    navigate("/account/places");
  };

  const handleDelete = (id) => {
    alert(id);
    axios
      .delete(`/deletePlace/${id}`)
      .then((res) => {
        toast.success(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log("Something went wrong!");
      });
  };

  return (
    <>
      {id !== "new" && (
        <div className="text-center">
          <Link
            to={`/account/places/new`}
            className="inline-flex items-center gap-1 bg-primary mb-4 text-white py-2 px-4 rounded-lg"
          >
            <ImEyePlus />
            Add a New Place
          </Link>
          <div className="max-w-7xl mx-auto">
            {fetchedPlaces.length > 0 &&
              fetchedPlaces.map((place) => (
                <div className="flex relative gap-3 mb-4 transition-all transition- hover:border border-gray-300 rounded-lg bg-gray-100 p-3 ">
                  <div className="flex w-32 bg-gray-300 grow shrink-0">
                    <PlacesImage place={place} />
                  </div>
                  <div className="grow-0 shrink">
                    <h2 className=" w-[200px]  text-lg sm:text-xl truncate locationTitle">
                      {place.title}
                    </h2>
                    <p className="text-sm mt-2 locationDescription h-[50px] overflow-auto">
                      {place.description}
                    </p>
                  </div>
                  <div className="flex gap-2 relative cursor-pointer">
                    <div
                      className="absolute right-2"
                      onClick={(e) => {
                        if (
                          !confirm(
                            "Are you sure you want to delete this location ?"
                          )
                        ) {
                          e.preventDefault();
                        } else {
                          handleDelete(place?._id);
                        }
                      }}
                    >
                      <FaTrash />
                    </div>
                    <div className="absolute right-8">
                      <Link to={`/account/places/edit/${place?._id}`}>
                        <AiFillEdit size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {id == "new" && (
        <div className="border-t-2 border-primary mt-4 shadow-2xl py-6 px-10 mx-auto ">
          <form onSubmit={handleFormPlaces}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a New Place"
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="New address"
            />

            <label htmlFor="photo">Photos:</label>
            <div className="flex">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder="Add using a link"
              />
              <button
                onClick={addPhotoByLink}
                className="bg-primary text-white rounded-md px-2"
              >
                Add&nbsp;Photo
              </button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {photos.length > 0 &&
                photos.map((link, idx) => (
                  <div className="h-32  relative flex" key={idx}>
                    <img
                      className=" w-full object-center rounded-2xl"
                      src={link}
                      alt="icon"
                    />
                    <button
                      onClick={(e) => removePhoto(e, link)}
                      className="absolute text-red-500 bg-white p-1 rounded-lg cursor-pointer right-1 top-2"
                    >
                      <HiOutlineTrash />
                    </button>
                    <button
                      onClick={(e) => selectPhoto(e, link)}
                      className="absolute text-red-500 bg-white p-1 rounded-lg cursor-pointer left-1 top-2"
                    >
                      {link === photos[0] ? <AiFillStar /> : <AiOutlineStar />}
                    </button>
                  </div>
                ))}
              <label className="bg-transparent cursor-pointer flex justify-center items-center gap-2 border border-gray-200 rounded-lg text-lg p-4 ">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadFile}
                />
                <SlCloudUpload />
                Upload
              </label>
            </div>
            <br />
            <label htmlFor="description">Description:</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Enter your description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <Perks selected={perks} onChange={setPerks} />
            <br />
            <label htmlFor="extraInfo">Other Informations:</label>
            <textarea
              name="extraInfo"
              id="extraInfo"
              cols="30"
              rows="10"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            ></textarea>
            <label htmlFor="check">Check In & Check Out:</label>
            <div className="grid grid-cols-2 gap-2 ">
              <div>
                <label htmlFor="checkIn">Check In:</label>
                <input
                  type="text"
                  name="checkIn"
                  id="checkIn"
                  placeholder="e.g,04:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="checkOut">Check Out:</label>
                <input
                  type="text"
                  name="checkOut"
                  id="checkOut"
                  placeholder="e.g,11:00"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="guest">Max Guests:</label>
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  step="1"
                  name="guest"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price">Price[$]:</label>
                <input
                  type="number"
                  min="20"
                  inputMode="decimal"
                  step="0.01"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <button className="bg-primary text-white rounded-lg p-2 my-3 w-full">
              {isLoading ? (
                <div className="newtons-cradle">
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Save</span>
                  <span>
                    <svg
                      width={20}
                      height={20}
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      ></path>
                    </svg>
                  </span>
                </div>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LocationPages;
