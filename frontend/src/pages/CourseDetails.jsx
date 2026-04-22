import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";

import GetAvgRating from "../utils/avgRating";
import { ACCOUNT_TYPE } from "./../utils/constants";
import { addToCart } from "../slices/cartSlice";

import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import Img from "./../components/common/Img";
import toast from "react-hot-toast";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  // 🔥 DUMMY COURSE DATA
  const response = {
    data: {
      totalDuration: "5h 30min",
      courseDetails: {
        _id: "1",
        courseName: "React JS Mastery",
        courseDescription:
          "Learn React from basics to advanced with real projects",
        thumbnail: "https://source.unsplash.com/600x400/?react",
        price: 499,
        whatYouWillLearn: "React Basics\nHooks\nRedux\nProject Building",
        ratingAndReviews: [1, 2, 3, 4],
        studentsEnrolled: [1, 2, 3, 4, 5],
        createdAt: new Date(),
        tag: ["React", "Frontend", "JavaScript"],

        instructor: {
          firstName: "Nithish",
          lastName: "Raj",
          image: "https://i.pravatar.cc/150?img=3",
          additionalDetails: {
            about: "Full Stack Developer & Instructor",
          },
        },

        courseContent: [
          {
            _id: "sec1",
            sectionName: "Introduction",
            subSection: [
              { title: "Welcome", timeDuration: "5min" },
              { title: "Setup", timeDuration: "10min" },
            ],
          },
          {
            _id: "sec2",
            sectionName: "React Basics",
            subSection: [
              { title: "Components", timeDuration: "15min" },
              { title: "Props & State", timeDuration: "20min" },
            ],
          },
        ],
      },
    },
  };

  // ⭐ Avg rating
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, []);

  // Accordion
  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? [...isActive, id]
        : isActive.filter((e) => e !== id),
    );
  };

  // Lecture count
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length;
    });
    setTotalNoOfLectures(lectures);
  }, []);

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    tag,
  } = response.data.courseDetails;

  // Buy handler
  const handleBuyCourse = () => {
    if (!token) {
      setConfirmationModal({
        text1: "Login Required",
        text2: "Please login to buy course",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }
    toast.success("Course Purchased (Demo)");
  };

  // Cart handler
  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructor can't buy course");
      return;
    }
    if (!token) {
      setConfirmationModal({
        text1: "Login Required",
        text2: "Please login",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }
    dispatch(addToCart(response.data.courseDetails));
    toast.success("Added to cart");
  };

  return (
    <>
      <div className="bg-richblack-800 text-white p-6">
        <GiReturnArrow
          onClick={() => navigate(-1)}
          className="cursor-pointer mb-4"
        />

        <h1 className="text-4xl font-bold">{courseName}</h1>
        <p>{courseDescription}</p>

        <div className="flex gap-2 mt-2">
          <span>{avgReviewCount}</span>
          <RatingStars Review_Count={avgReviewCount} />
          <span>({ratingAndReviews.length} reviews)</span>
        </div>

        <p>
          Instructor: {instructor.firstName} {instructor.lastName}
        </p>
        <p>
          <BiInfoCircle /> Created at {new Date(createdAt).toDateString()}
        </p>
        <p>
          <HiOutlineGlobeAlt /> English
        </p>
      </div>

      <div className="p-6 text-white">
        <h2 className="text-2xl">What you'll learn</h2>
        {whatYouWillLearn.split("\n").map((item, i) => (
          <p key={i}>
            {i + 1}. {item}
          </p>
        ))}

        <h2 className="text-2xl mt-6">Course Content</h2>
        <p>
          {courseContent.length} sections • {totalNoOfLectures} lectures
        </p>

        {courseContent.map((sec) => (
          <CourseAccordionBar
            key={sec._id}
            course={sec}
            isActive={isActive}
            handleActive={handleActive}
          />
        ))}

        <h2 className="text-2xl mt-6">Author</h2>
        <div className="flex gap-4 items-center">
          <Img src={instructor.image} className="w-14 h-14 rounded-full" />
          <div>
            <p>
              {instructor.firstName} {instructor.lastName} <MdOutlineVerified />
            </p>
            <p>{instructor.additionalDetails.about}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-3xl">₹{price}</p>
          <button onClick={handleBuyCourse} className="yellowButton">
            Buy Now
          </button>
          <button onClick={handleAddToCart} className="blackButton ml-2">
            Add to Cart
          </button>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
