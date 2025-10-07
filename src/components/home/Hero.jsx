import React from 'react';
import { Link } from 'react-router-dom';
import { mockModules } from '../../data/mockData';

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
  const imageByModuleId = {
    'mod-python': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
    'mod-computer-basics': 'https://cdn-icons-png.flaticon.com/512/2702/2702602.png',
    'mod-digital-literacy': 'https://cdn-icons-png.flaticon.com/512/3176/3176362.png',
  }

  const modules = mockModules.map((m) => ({
    id: m.id,
    title: m.moduleName,
    description: m.description,
    image: imageByModuleId[m.id] || 'https://cdn-icons-png.flaticon.com/512/4359/4359963.png',
  }))

  return (
    <div className="h-auto bg-gray-100 py-10 px-6">
      <h2 className="text-2xl font-bold text-left mb-6 text-gray-800">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {modules.map((module) => (
          <Link key={module.id} to={`/lesson/${module.id}`} className="block">
            <Card
              title={module.title}
              description={module.description}
              image={module.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
