import React from 'react';

function ResourceCard({ resource }) {
  resource = resource.fields;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg relative group">
      <div className="overflow-hidden rounded-lg relative">
        <img 
          src={resource.displayImage.fields.file.url} 
          alt={resource.name} 
          className="object-cover w-full h-48 group-hover:opacity-75"
        />
        <a 
          href={resource.link} 
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          target='_blank'
          rel='noreferrer'
        >
          <button className="bg-[#ADBE99] text-black px-4 py-2 rounded-full">Download</button>
        </a>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className="mt-2 text-xl font-bold">{resource.name}</h2>
        <p className="text-gray-600">
          {resource.category?.map((cat, index) => (
            <span key={index} className="inline-block bg-neutral-200 rounded-full px-3 py-1 text-[10px] font-semibold text-gray-700 mr-2">
              {cat}
            </span>
          ))}
        </p>
        <p className="text-gray-600">by <a href={resource.creatorLink} target='_blank' rel='noreferrer' className={resource.creatorLink ? 'underline' : ''}> {resource.creator} </a></p>
      </div>
    </div>
  );
}

export default ResourceCard;
