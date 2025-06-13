import React, { useRef, useState } from "react";
import backgroundImageDesktop from "../assets/images/background-desktop.png";
import patternLines from "../assets/images/pattern-lines.svg";
import patternSquigglyLineBottomDesktop from "../assets/images/pattern-squiggly-line-bottom-desktop.svg";
import patternSquigglyLineTop from "../assets/images/pattern-squiggly-line-top.svg";
import patternCircle from "../assets/images/pattern-circle.svg";
import logoFull from "../assets/images/logo-full.svg";
import uploadIcon from "../assets/images/icon-upload.svg";
import infoIcon from "../assets/images/icon-info.svg";
import { ToastContainer, toast } from "react-toastify";
import Ticket from "./Ticket";

const Container = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    githubUsername: "",
  });
  const [uploadedImg, setUploadedImg] = useState(null);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    githubUsername: "",
    uploadedImg: "",
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const uploadRef = useRef(null);
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validateGithubUsername = (username) => {
    // Must start with @, followed by 1-39 letters, numbers, underscores, or hyphens
    return /^@[a-zA-Z0-9_-]{1,39}$/.test(username);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!uploadedImg) {
      newErrors.uploadedImg = "Please upload an image before submitting.";
    }
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email Address is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.githubUsername) {
      newErrors.githubUsername = "GitHub Username is required.";
    } else if (!validateGithubUsername(formData.githubUsername)) {
      newErrors.githubUsername = "Please enter a valid GitHub username (start with @, 1-39 letters, numbers, underscores, or hyphens).";
    } 

    setErrors(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before submitting.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (Object.keys(newErrors).length === 0) {
      toast.success("Ticket generated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSuccessful(true);
    }
  };

  const handleUpload = (e) => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        toast.error("File size exceeds 500kb. Please upload a smaller image.", {
          position: "top-right",
          autoClose: 3000,
        });
        setUploadedImg(false);
        uploadRef.current.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageDesktop})` }}
    >
      <div className="absolute inset-0 z-10 h-full pointer-events-auto">
        <div className="relative h-full w-full">
          <div className="w-full opacity-20">
            <img src={patternLines} alt="Line pattern" className="w-full" />
          </div>
          <div className="w-[50%] absolute bottom-0 left-0">
            <img
              src={patternSquigglyLineBottomDesktop}
              alt="Bottom Squiggly Line"
              className="w-full"
            />
          </div>
          <div className="w-[20%] absolute top-20 right-0">
            <img
              src={patternSquigglyLineTop}
              alt="Top Squiggly Line"
              className="w-full"
            />
          </div>
          <div className="w-[30%] absolute bottom-70 right-0">
            <img src={patternCircle} alt="Circle pattern" />
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-5 items-center justify-center text-white z-20 h-full my-10">
        <div className="my-10">
          <img src={logoFull} alt="Full Logo" className="w-50" />
        </div>
        {isSuccessful ? (
          <div className="flex flex-col items-center justify-center lg:gap-20 md:gap-20 gap-10">
            <div className="flex flex-col items-center text-center gap-2 w-full lg:max-w-4xl md:max-w-3xl max-w-xl ">
              <h1 className="lg:text-6xl md:text-6xl text-4xl font-bold ">
                Congrats,
                <span className="bg-gradient-to-r from-[#f37362] to-[#ffffff] bg-clip-text text-transparent">
                  {formData.fullName}!
                </span>
                Your ticket is ready
              </h1>
              <p className="text-xl font-semibold text-[#8784a4] max-w-lg">
                We've emailed your ticket to <span className="text-[#f37362]">{formData.email}</span> and will send
                updates in the run up to the event
              </p>
            </div>
            <Ticket formData={formData} image={uploadedImg}  />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center text-center gap-2 w-full lg:max-w-4xl md:max-w-3xl max-w-xl ">
              <h1 className="lg:text-6xl md:text-6xl text-4xl font-bold ">
                Your Journey to Coding Conf 2025 Starts Here!
              </h1>
              <p className="text-xl font-semibold text-[#8784a4]">
                Secure your spot at next year's biggest coding conference.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full lg:max-w-xl md:max-w-xl max-w-sm p-6"
            >
              <div className="flex flex-col w-full gap-2">
                <label className="text-xl">Upload Avatar</label>
                <div
                  onClick={!uploadedImg ? handleUpload : undefined}
                  className={`relative flex flex-col items-center justify-center gap-3 border-dashed border-2 border-gray-500 rounded-lg h-40 ${
                    !uploadedImg && "cursor-pointer"
                  }`}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={uploadRef}
                    accept="image/png, image/jpeg"
                    className="hidden"
                  />
                  {uploadedImg ? (
                    <span className="border border-gray-400 rounded-lg lg:h-20 md:h-20 h-15">
                      <img
                        src={uploadedImg}
                        alt="User image"
                        className="lg:w-20  md:w-20 w-15 h-full object-cover  rounded-lg"
                      />
                    </span>
                  ) : (
                    <span className="p-3 bg-[#4b486a] border border-gray-400 rounded-lg">
                      <img
                        src={uploadIcon}
                        alt="Upload Icon"
                        className="w-10 h-10 object-contain"
                      />
                    </span>
                  )}
                  {uploadedImg ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setUploadedImg(null);
                          uploadRef.current.value = "";
                        }}
                        className="p-2 bg-[#4b486a] text-white rounded-lg font-semibold text-sm hover:[#d2d1d6] cursor-pointer"
                      >
                        Remove Image
                      </button>
                      <button
                        onClick={handleUpload}
                        className="p-2 bg-[#4b486a] text-white rounded-lg font-semibold text-sm hover:[#d2d1d6] cursor-pointer"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <p className="lg:text-2xl md:text-2xl text-lg">Drag and drop or click to upload</p>
                  )}
                  <div
                    className={`absolute inset-0 bg-[#4b486a] hover:bg-[#d2d1d6] opacity-40 ${
                      uploadedImg && "pointer-events-none"
                    } transition-colors duration-300`}
                  ></div>
                </div>

                {uploadedImg === false ? (
                  <div className="flex gap-2 text-sm text-[#e16151]">
                    <img src={infoIcon} alt="Icon Info" />
                    <p>File too large. Please upload a photo under 500KB</p>
                  </div>
                ) : errors.uploadedImg ? (
                  <div className="flex gap-2 text-[#e16151] text-sm">
                    <img
                      src={infoIcon}
                      alt="Icon Info"
                      className="text-[#e16151]"
                    />
                    <p>{errors.uploadedImg}</p>
                  </div>
                ) : (
                  <div className="flex gap-2 text-sm text-[#8784a4]">
                    <img src={infoIcon} alt="Icon Info" />
                    <p>Upload your photo (JPG or PNG, ma size: 500kb)</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-xl">Full Name</label>
                <div className="relative cursor-pointer group">
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    className={`w-full border ${
                      errors.fullName ? "border-[#e16151]" : "border-white"
                    }  p-4 rounded-xl`}
                  />
                  <div className="absolute inset-0 bg-[#4b486a] group-hover:bg-[#d2d1d6] opacity-40 transition-colors duration-300 pointer-events-none rounded-xl"></div>
                </div>
                {errors.fullName && (
                  <div className="text-[#e16151] text-sm flex gap-2">
                    <img src={infoIcon} alt="Icon Info" />
                    <p>{errors.fullName}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-xl">Email Address</label>
                <div className="relative cursor-pointer group">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="example@email.com"
                    className={`w-full border ${
                      errors.email ? "border-[#e16151]" : "border-white"
                    }  p-4 rounded-xl`}
                  />
                  <div className="absolute inset-0 bg-[#4b486a] group-hover:bg-[#d2d1d6] opacity-40 transition-colors duration-300 pointer-events-none rounded-xl"></div>
                </div>
                {errors.email && (
                  <div className="text-[#e16151] text-sm flex gap-2">
                    <img src={infoIcon} alt="Icon Info" />
                    <p>{errors.email}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-xl">GitHub Username</label>
                <div className="relative cursor-pointer group">
                  <input
                    name="githubUsername"
                    type="text"
                    value={formData.githubUsername}
                    onChange={handleFormChange}
                    placeholder="@youruername"
                    className={`w-full border ${
                      errors.githubUsername
                        ? "border-[#e16151]"
                        : "border-white"
                    }  p-4 rounded-xl`}
                  />
                  <div className="absolute inset-0 bg-[#4b486a] group-hover:bg-[#d2d1d6]  opacity-40 transition-colors duration-300 pointer-events-none rounded-xl"></div>
                </div>
                {errors.githubUsername && (
                  <div className="text-[#e16151] text-sm flex gap-2">
                    <img src={infoIcon} alt="Icon Info" />
                    <p>{errors.githubUsername}</p>
                  </div>
                )}
              </div>
              <button className="p-4 bg-[#f57261] hover:bg-[#e16151] text-black rounded-xl font-bold text-xl transition-colors duration-300 cursor-pointer">
                Generate My Ticket
              </button>
            </form>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Container;
