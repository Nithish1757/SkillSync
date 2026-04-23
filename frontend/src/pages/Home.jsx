import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import Course_Slider from "../components/core/Catalog/Course_Slider";

import { getCatalogPageData } from "../services/operations/pageAndComponentData";

import { MdOutlineRateReview } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

import { motion } from "framer-motion";
import { fadeIn } from "./../components/common/motionFrameVarients";

// background random images
import backgroundImg1 from "../assets/Images/random bg img/coding bg1.jpg";
import backgroundImg2 from "../assets/Images/random bg img/coding bg2.jpg";
import backgroundImg3 from "../assets/Images/random bg img/coding bg3.jpg";
import backgroundImg4 from "../assets/Images/random bg img/coding bg4.jpg";
import backgroundImg5 from "../assets/Images/random bg img/coding bg5.jpg";
import backgroundImg6 from "../assets/Images/random bg img/coding bg6.jpeg";
import backgroundImg7 from "../assets/Images/random bg img/coding bg7.jpg";
import backgroundImg8 from "../assets/Images/random bg img/coding bg8.jpeg";
import backgroundImg9 from "../assets/Images/random bg img/coding bg9.jpg";
import backgroundImg10 from "../assets/Images/random bg img/coding bg10.jpg";
import backgroundImg111 from "../assets/Images/random bg img/coding bg11.jpg";

const randomImges = [
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  backgroundImg5,
  backgroundImg6,
  backgroundImg7,
  backgroundImg8,
  backgroundImg9,
  backgroundImg10,
  backgroundImg111,
];

const Home = () => {
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [CatalogPageData, setCatalogPageData] = useState(null);

  // ✅ FIX ADDED
  const [showPayment, setShowPayment] = useState(false);

  const categoryID = "6506c9dff191d7ffdb4a3fe2";
  const dispatch = useDispatch();

  useEffect(() => {
    const bg = randomImges[Math.floor(Math.random() * randomImges.length)];
    setBackgroundImg(bg);
  }, []);

  useEffect(() => {
    const fetchCatalogPageData = async () => {
      const result = await getCatalogPageData(categoryID, dispatch);
      setCatalogPageData(result);
    };
    if (categoryID) {
      fetchCatalogPageData();
    }
  }, [categoryID]);

  return (
    <React.Fragment>
      {/* background random image */}
      <div>
        <div className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 opacity-[0.3] overflow-hidden object-cover ">
          <img
            src={backgroundImg}
            alt="Background"
            className="w-full h-full object-cover "
          />
          <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg "></div>
        </div>
      </div>

      <div className=" ">
        {/*Section1  */}
        <div className="relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white ">
          <Link to={"/signup"}>
            <div className="z-0 group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
              <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                <p>Become an Instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>

          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            className="text-center text-3xl lg:text-4xl font-semibold mt-7"
          >
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
          </motion.div>

          <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
          </div>
        </div>

        {/* COURSE CARDS */}
        <div className="mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent">
          <h2 className="text-white mb-6 text-2xl">Popular Picks for You 🏆</h2>

          <div className="flex gap-6 overflow-x-auto">
            {/* Card */}
            <div className="bg-richblack-800 rounded-xl p-4 min-w-[260px] flex flex-col gap-3">
              <h3 className="text-white font-semibold">JavaScript Mastery</h3>
              <p className="text-yellow-400 font-bold">₹499</p>
              <button
                onClick={() => setShowPayment(true)} // ✅ FIX
                className="bg-yellow-400 text-black py-2 rounded-lg"
              >
                Pay Now
              </button>
            </div>

            <div className="bg-richblack-800 rounded-xl p-4 min-w-[260px] flex flex-col gap-3">
              <h3 className="text-white font-semibold">Python</h3>
              <p className="text-yellow-400 font-bold">₹399</p>
              <button
                onClick={() => setShowPayment(true)} // ✅ FIX
                className="bg-yellow-400 text-black py-2 rounded-lg"
              >
                Pay Now
              </button>
            </div>
            <div className="bg-richblack-800 rounded-xl p-4 min-w-[260px] flex flex-col gap-3">
              <h3 className="text-white font-semibold">React</h3>
              <p className="text-yellow-400 font-bold">₹3999</p>
              <button
                onClick={() => setShowPayment(true)} // ✅ FIX
                className="bg-yellow-400 text-black py-2 rounded-lg"
              >
                Pay Now
              </button>
            </div>
            <div className="bg-richblack-800 rounded-xl p-4 min-w-[260px] flex flex-col gap-3">
              <h3 className="text-white font-semibold">Python</h3>
              <p className="text-yellow-400 font-bold">₹399</p>
              <button
                onClick={() => setShowPayment(true)} // ✅ FIX
                className="bg-yellow-400 text-black py-2 rounded-lg"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>

        {/* PAYMENT MODAL */}
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-4xl rounded-xl flex overflow-hidden">
              {/* LEFT SIDE */}
              <div className="w-1/2 bg-blue-500 text-white p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold">SkillSync</h2>
                <p className="text-sm">
                  Prime 2.0: Complete AI/ML Batch | Job Ready in 4.5 Months!
                </p>

                <img
                  src="https://source.unsplash.com/400x250/?ai"
                  className="rounded-lg"
                />

                <p className="text-sm">
                  Complete AI/ML course to become job ready.
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-1/2 p-6 flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Payment Details</h2>
                <p className="font-bold text-xl">₹ 6680</p>

                <input
                  type="email"
                  placeholder="Email ID"
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  placeholder="Name"
                  className="border p-2 rounded"
                />

                <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Pay ₹6680 →
                </button>

                <button
                  onClick={() => setShowPayment(false)}
                  className="text-gray-500 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
