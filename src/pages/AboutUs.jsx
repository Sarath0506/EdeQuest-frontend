import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg space-y-8">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">About Us</h1>
        <p className="text-gray-300 text-lg">
          Welcome to EduQuest – where education meets accessibility and innovation.
        </p>
      </div>

      {/* Mission Section */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-yellow-400">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          At EduQuest, our mission is to empower individuals to access quality education from anywhere in the world. 
          We aim to connect students with passionate instructors, creating a vibrant learning community that is accessible, 
          engaging, and effective.
        </p>
      </section>

      {/* Features Section */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-yellow-400">Features and Services</h2>
        <ul className="text-gray-300 space-y-2">
          <li>
            <span className="font-bold">Comprehensive Course Management:</span> Instructors can create, publish, and manage courses seamlessly. 
            Students can browse, purchase, and keep track of their learning journey.
          </li>
          <li>
            <span className="font-bold">Interactive Student-Instructor Communication:</span> Engage in discussions, ask questions, 
            and receive feedback directly from your instructor.
          </li>
          <li>
            <span className="font-bold">Secure Payment and Enrollment:</span> Enjoy a seamless and secure checkout experience, 
            allowing students to enroll in courses with confidence.
          </li>
          <li>
            <span className="font-bold">Advanced Analytics for Instructors:</span> Track course popularity, revenue generation, 
            and student engagement through dynamic dashboards.
          </li>
          <li>
            <span className="font-bold">Customizable Profiles:</span> Both students and instructors can personalize their profiles 
            to reflect their interests and expertise.
          </li>
          <li>
            <span className="font-bold">Direct Support:</span> With an easy-to-use contact form and responsive email support, 
            we ensure your questions are answered promptly.
          </li>
        </ul>
      </section>

      {/* Join Us Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold text-yellow-400">Join Us on EduQuest</h2>
        <p className="text-gray-300 mt-2 leading-relaxed">
          EduQuest is more than just a platform – it’s a community committed to growth, knowledge, and collaboration. 
          Join us to learn new skills, share knowledge, and be a part of a global educational movement.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
