import React from 'react';

function ResourceCard({ resource }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg relative group">
      <div className="overflow-hidden rounded-lg">
        <img 
          src={resource.image} 
          alt={resource.name} 
          className="object-cover w-full h-48 group-hover:opacity-75"
        />
        <a 
          href={resource.link} 
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Download</button>
        </a>
      </div>
      <h2 className="mt-2 text-xl font-bold">{resource.name}</h2>
      <p className="text-gray-600">{resource.category}</p>
      <p className="text-gray-600">by {resource.author}</p>
    </div>
  );
}

export default ResourceCard;
