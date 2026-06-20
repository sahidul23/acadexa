
import { useState } from "react";
import { createStudent } from "../../services/studentServices";

function StudentForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    admission_number: "",
    roll_number: "",
    academic_class: 1,
    section: 1,
    guardian_name: "",
    guardian_phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await createStudent(formData);

    console.log(response);

    alert("Student Added Successfully!");

    setFormData({
      username: "",
      password: "",
      admission_number: "",
      roll_number: "",
      academic_class: 1,
      section: 1,
      guardian_name: "",
      guardian_phone: "",
    });

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(JSON.stringify(error.response.data));
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="admission_number"
        placeholder="Admission Number"
        value={formData.admission_number}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="roll_number"
        placeholder="Roll Number"
        value={formData.roll_number}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
       
        name="academic_class"
        value={formData.academic_class}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value={1}>11 Science</option>
        <option value={2}>12 Science</option>
      </select>

      <select
        name="section"
        value={formData.section}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value={1}>A</option>
        <option value={2}>B</option>
      </select>

      <input
        type="text"
        name="guardian_name"
        placeholder="Guardian Name"
        value={formData.guardian_name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="guardian_phone"
        placeholder="Guardian Phone"
        value={formData.guardian_phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Save Student
      </button>

    </form>
  );
}

export default StudentForm;