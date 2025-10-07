import React from 'react';

const Card = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out">
      <img
        src={image}
        alt={title}
        className="w-20 h-20 mx-auto object-contain mb-3"
      />
      <h3 className="text-lg font-semibold text-center mb-1">{title}</h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </div>
  );
};

const Home = () => {
  const modules = [
    {
      id: 1,
      title: 'Python Programming',
      description: 'Learn Python from basics to advanced with simple examples.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
    },
    {
      id: 2,
      title: 'Basic Computer Skills',
      description: 'Understand computer fundamentals and essential operations.',
      image: 'https://cdn-icons-png.flaticon.com/512/2702/2702602.png',
    },
    {
      id: 3,
      title: 'Digital Literacy',
      description: 'Learn how to use the internet safely and effectively.',
      image: 'https://cdn-icons-png.flaticon.com/512/3176/3176362.png',
    },
    {
      id: 4,
      title: 'Web Development',
      description: 'Master HTML, CSS, and JavaScript to build modern websites.',
      image: 'https://cdn-icons-png.flaticon.com/512/919/919827.png',
    },
    {
      id: 5,
      title: 'Data Science Basics',
      description: 'Explore the world of data analysis, visualization, and ML.',
      image: 'https://cdn-icons-png.flaticon.com/512/4149/4149670.png',
    },
    {
      id: 6,
      title: 'Cyber Security Fundamentals',
      description: 'Learn how to protect yourself and organizations from cyber threats.',
      image: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png',
    },
  ];

  return (
    <div className="h-auto bg-gray-100 py-10 px-6">
      <h2 className="text-2xl font-bold text-left mb-6 text-gray-800">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {modules.map((module) => (
          <Card
            key={module.id}
            title={module.title}
            description={module.description}
            image={module.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
