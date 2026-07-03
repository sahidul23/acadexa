import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import TestModal from "../components/tests/TestModal";
import TestForm from "../components/tests/TestForm";
import TestCard from "../components/tests/TestCard";

import {
  getTests,
  deleteTest,
  updateTest,
} from "../services/testService";

function MockTests() {
  const [tests, setTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await getTests();
      setTests(data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch tests");
    }
  };

  const handleEdit = (test) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const handleDelete = async (test) => {
    const confirmDelete = window.confirm(
      `Delete "${test.title}"?\n\nAll questions in this test will also be deleted.`
    );

    if (!confirmDelete) return;

    try {
      await deleteTest(test.id);

      alert("Test deleted successfully!");

      fetchTests();
    } catch (error) {
      console.log(error);
      alert("Failed to delete test");
    }
  };

  const handlePublish = async (test) => {
    try {
      await updateTest(test.id, {
        ...test,
        is_published: !test.is_published,
      });

      fetchTests();
    } catch (error) {
      console.log(error);
      alert("Failed to update test");
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Mock Tests
        </h1>

        <button
          onClick={() => {
            setSelectedTest(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          + Create Test
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {tests.map((test) => (
          <TestCard
            key={test.id}
            test={test}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTogglePublish={handlePublish}
          />
        ))}

      </div>

      <TestModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTest(null);
        }}
      >
        <TestForm
          test={selectedTest}
          onSuccess={() => {
            fetchTests();
            setIsModalOpen(false);
            setSelectedTest(null);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTest(null);
          }}
        />
      </TestModal>

    </DashboardLayout>
  );
}

export default MockTests;