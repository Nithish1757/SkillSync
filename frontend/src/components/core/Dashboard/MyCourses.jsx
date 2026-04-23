import { useState, useEffect } from "react";
import { VscAdd } from "react-icons/vsc";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    instructor: "",
    duration: "",
    level: "",
    language: "",
    learn: "",
    requirements: "",
    image: null,
  });

  // 🔒 LOCK SCROLL WHEN MODAL OPEN
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        setForm({ ...form, image: URL.createObjectURL(file) });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ADD COURSE
  const handleAddCourse = (e) => {
    e.preventDefault();

    const newCourse = {
      id: Date.now(),
      ...form,
    };

    setCourses([...courses, newCourse]);

    // RESET
    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      instructor: "",
      duration: "",
      level: "",
      language: "",
      learn: "",
      requirements: "",
      image: null,
    });

    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl text-white">My Courses</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded"
        >
          <VscAdd /> Add Course
        </button>
      </div>

      {/* COURSE CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <p className="text-white">No Courses Yet</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-richblack-800 p-4 rounded shadow"
            >
              {course.image && (
                <img
                  src={course.image}
                  alt="course"
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <h2 className="text-white text-lg font-bold">{course.title}</h2>

              <p className="text-gray-400 text-sm">by {course.instructor}</p>

              <p className="text-yellow-400 font-semibold mt-1">
                ₹{course.price}
              </p>

              <p className="text-gray-300 text-sm mt-2">{course.description}</p>

              <div className="text-sm text-gray-400 mt-2">
                <p>📂 {course.category}</p>
                <p>⏱ {course.duration}</p>
                <p>📊 {course.level}</p>
                <p>🌐 {course.language}</p>
              </div>

              <div className="mt-3 text-sm">
                <p className="text-green-400">✔ Learn:</p>
                <p className="text-gray-300">{course.learn}</p>
              </div>

              <div className="mt-2 text-sm">
                <p className="text-red-400">⚠ Requirements:</p>
                <p className="text-gray-300">{course.requirements}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-70 flex justify-center items-center"
          onClick={() => setShowModal(false)} // click outside closes
        >
          {/* STOP CLOSE WHEN CLICK INSIDE */}
          <div
            className="bg-white p-6 rounded w-[400px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Create Course</h2>

            <form onSubmit={handleAddCourse} className="space-y-3">
              <input
                name="title"
                placeholder="Course Title"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="price"
                placeholder="Price"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="category"
                placeholder="Category"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="instructor"
                placeholder="Instructor Name"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="duration"
                placeholder="Duration (e.g. 10 hours)"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="level"
                placeholder="Level (Beginner/Intermediate)"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="language"
                placeholder="Language"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="learn"
                placeholder="What you will learn"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="requirements"
                placeholder="Requirements"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-yellow-400 px-4 py-1 rounded"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
