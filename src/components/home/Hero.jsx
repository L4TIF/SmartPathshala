import React from 'react';
import { Link } from 'react-router-dom';
import { mockModules } from '../../data/mockData';

const Card = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out">
      <img
        src={image}
        alt={title}
        className="w-full h-32 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-center mb-1">{title}</h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </div>
  );
};

const Home = () => {
  const imageByModuleId = {
    'mod-python': 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    'mod-computer-basics': 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop',
    'mod-digital-literacy': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
  }

  const modules = mockModules.map((m) => ({
    id: m.id,
    title: m.moduleName,
    description: m.description,
    image: imageByModuleId[m.id] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
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
