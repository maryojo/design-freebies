import React, { useState } from 'react';
import ResourceCard from './components/ResourceCard';
import resources from './components/resources';

const ITEMS_PER_PAGE = 15;

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const categories = ['All', ...new Set(resources.map(resource => resource.category))];

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const handleLoadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + ITEMS_PER_PAGE);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-4">Resource Library</h1>
      <div className="flex justify-center mb-4">
        {categories.map(category => (
          <button 
            key={category} 
            className={`px-4 py-2 m-2 rounded-full ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
            onClick={() => { 
              setSelectedCategory(category);
              setVisibleItems(ITEMS_PER_PAGE);  // Reset visible items on category change
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredResources.slice(0, visibleItems).map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      {visibleItems < filteredResources.length && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleLoadMore} 
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
