import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/common/Footer";
import Course_Card from "../components/core/Catalog/Course_Card";
import Course_Slider from "../components/core/Catalog/Course_Slider";

function Catalog() {
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);

  // 🔥 FAKE COURSE DATA
  const dummyData = {
    selectedCategory: {
      name: "Web Development",
      description: "Learn frontend and backend technologies",
      courses: [
        {
          _id: "1",
          courseName: "React JS Mastery",
          instructor: { firstName: "John", lastName: "Doe" },
          price: 499,
          thumbnail: "https://source.unsplash.com/400x300/?react",
          studentsEnrolled: [1, 2, 3, 4],
          ratingAndReviews: [1, 2, 3],
        },
        {
          _id: "2",
          courseName: "Node.js Bootcamp",
          instructor: { firstName: "Nithish", lastName: "Raj" },
          price: 399,
          thumbnail: "https://source.unsplash.com/400x300/?nodejs",
          studentsEnrolled: [1, 2],
          ratingAndReviews: [1, 2],
        },
        {
          _id: "3",
          courseName: "MongoDB Complete Guide",
          instructor: { firstName: "Alex", lastName: "Smith" },
          price: 299,
          thumbnail: "https://source.unsplash.com/400x300/?mongodb",
          studentsEnrolled: [1, 2, 3],
          ratingAndReviews: [1],
        },
      ],
    },

    differentCategory: {
      name: "Data Science",
      courses: [
        {
          _id: "4",
          courseName: "Python for Data Science",
          instructor: { firstName: "David", lastName: "Lee" },
          price: 599,
          thumbnail: "https://source.unsplash.com/400x300/?python",
          studentsEnrolled: [1, 2, 3],
          ratingAndReviews: [1, 2],
        },
        {
          _id: "5",
          courseName: "Machine Learning A-Z",
          instructor: { firstName: "Sarah", lastName: "Kim" },
          price: 699,
          thumbnail: "https://source.unsplash.com/400x300/?machinelearning",
          studentsEnrolled: [1],
          ratingAndReviews: [1],
        },
      ],
    },

    mostSellingCourses: [
      {
        _id: "6",
        courseName: "Full Stack Developer",
        instructor: { firstName: "Rahul", lastName: "Sharma" },
        price: 799,
        thumbnail: "https://source.unsplash.com/400x300/?coding",
        studentsEnrolled: [1, 2, 3, 4, 5],
        ratingAndReviews: [1, 2, 3],
      },
      {
        _id: "7",
        courseName: "UI/UX Design",
        instructor: { firstName: "Anita", lastName: "Verma" },
        price: 499,
        thumbnail: "https://source.unsplash.com/400x300/?design",
        studentsEnrolled: [1, 2],
        ratingAndReviews: [1],
      },
    ],
  };

  const catalogPageData = dummyData;

  return (
    <>
      {/* Hero Section */}
      <div className="bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContent flex-col justify-center gap-4">
          <p className="text-sm text-richblack-300">
            Home / Catalog /
            <span className="text-yellow-25">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>

          <p className="text-3xl text-richblack-5">
            {catalogPageData?.selectedCategory?.name}
          </p>

          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto w-full max-w-maxContent px-4 py-12">
        <div className="section_heading">Courses to get you started</div>

        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${active === 1 ? "text-yellow-25 border-b-yellow-25 border-b" : "text-richblack-50"}`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>

          <p
            className={`px-4 py-2 ${active === 2 ? "text-yellow-25 border-b-yellow-25 border-b" : "text-richblack-50"}`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>

        <Course_Slider Courses={catalogPageData?.selectedCategory?.courses} />
      </div>

      {/* Section 2 */}
      <div className="mx-auto w-full max-w-maxContent px-4 py-12">
        <div className="section_heading">
          Top courses in {catalogPageData?.differentCategory?.name}
        </div>

        <Course_Slider Courses={catalogPageData?.differentCategory?.courses} />
      </div>

      {/* Section 3 */}
      <div className="mx-auto w-full max-w-maxContent px-4 py-12">
        <div className="section_heading">Frequently Bought</div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 py-8">
          {catalogPageData?.mostSellingCourses.map((course, i) => (
            <Course_Card course={course} key={i} Height={"h-[300px]"} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Catalog;
