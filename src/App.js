import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import ResourceCard from './components/ResourceCard';

const ITEMS_PER_PAGE = 15;

const client = createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});

function App() {
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const entries = await client.getEntries();
        setLoading(false);
        setResources(entries.items);
      } catch (error) {
        setLoading(false);
        alert('Something went wrong. Please try again');
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, []);

  const categories = ['All', ...new Set(resources.flatMap(resource => resource.fields.category))];

  const filteredResources = selectedCategory === 'All' 
  ? resources 
  : resources.filter(resource => resource.fields.category?.includes(selectedCategory));

  const handleLoadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + ITEMS_PER_PAGE);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 relative pb-20">
      <h1 className="text-3xl font-bold text-center mb-2">Design Resource Library</h1>
      <p className='text-center mb-4'>My personal collection of high quality design resources</p>
      <div className="flex justify-center mb-10">
        {categories.map(category => (
          <button 
            key={category} 
            className={`px-4 py-1 mx-2 text-sm rounded-full ${selectedCategory === category ? 'bg-[#ADBE99] text-black' : 'bg-neutral-200'}`} 
            onClick={() => { 
              setSelectedCategory(category);
              setVisibleItems(ITEMS_PER_PAGE);  // Reset visible items on category change
            }}
          >
            {category}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="flex justify-center mt-4">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredResources.slice(0, visibleItems).map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
          {visibleItems < filteredResources.length && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={handleLoadMore} 
                className="px-4 py-2 bg-[#ADBE99] text-black rounded-full"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
      <p className='absolute right-2 bottom-2'>Collated with ❤️ by <a href='https://bento.me/mary-uxe/' target='_blank' rel='noreferrer' className='underline'>Mary</a></p>
    </div>
  );
}

export default App;
