import { useState } from "react";
import { addCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

export default function CourseInformationForm() {
  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
    price: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await addCourseDetails(form);

      console.log(result);
      alert("Course Created Successfully");

      setForm({
        courseName: "",
        courseDescription: "",
        price: "",
        category: "",
      });
    } catch (err) {
      console.log(err);
      alert("Error creating course");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-richblack-800 rounded-md space-y-4"
    >
      <h2 className="text-white text-xl">Create Course</h2>

      <input
        type="text"
        name="courseName"
        placeholder="Course Name"
        value={form.courseName}
        onChange={handleChange}
        className="w-full p-2 rounded bg-richblack-700 text-white"
      />

      <textarea
        name="courseDescription"
        placeholder="Description"
        value={form.courseDescription}
        onChange={handleChange}
        className="w-full p-2 rounded bg-richblack-700 text-white"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 rounded bg-richblack-700 text-white"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 rounded bg-richblack-700 text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 text-black px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Course"}
      </button>
    </form>
  );
}
