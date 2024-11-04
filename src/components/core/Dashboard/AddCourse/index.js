import RenderSteps from "./RenderSteps";

export default function AddCourse() {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Add Course</h1>
        <div className="shadow-lg rounded-lg p-6 bg-gray-800">
          <RenderSteps />
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <p className="text-xl font-semibold mb-4">Code Upload Tips</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Ensure quality content for better engagement.</li>
        </ul>
      </div>
    </div>
  );
}
