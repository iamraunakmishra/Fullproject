import React from 'react';
import { Handle, Position } from 'reactflow';
function Backnode({ id, data, type, inputHandles = [], outputHandles = [], children, title, selected }) {
  return (
    <div className='min-w-[20%] min-h-[100px] bg-white border border-pink-300 rounded-lg p-2 shadow-sm'>
    <div className={selected ? 'selected' : ''}>
      <div className='bg-gray-300 px-4 py-2 border border-pink-300  text-sm font-semibold text-gray-800  flex justify-between items-cente'>
        {title || 'Node'}
      </div>
      <div className='flex-grow'>
        {children}
      </div>
     {inputHandles.map(handle => ( 
          <div key={handle.id} className="relative flex items-center justify-start h-6 my-1">
            <Handle
              className='w-3 h-3 !bg-sky-500 !border-2 !border-sky-500 rounded-full transition-colors duration-200'
              type="target"
              position={handle.position || Position.Left}
              id={handle.id}
              isConnectable={1}
            />
            {/* Display the label next to the handle */}
            {handle.label && (
              <div className="absolute left-6 text-xs text-gray-600 pointer-events-none">
                {handle.label}
              </div>
            )}
          </div>
        ))}
        
        {outputHandles.map(handle => ( 
          <div key={handle.id} className="relative flex items-center justify-end h-6 my-1">
            
            {handle.label && (
              <div className="absolute right-6 text-xs text-gray-600 pointer-events-none">
                {handle.label}
              </div>
            )}
            <Handle
              className='w-3 h-3 !bg-sky-500 !border-2 !border-sky-500 rounded-full transition-colors duration-200'
              type="source"
              position={handle.position || Position.Right}
              id={handle.id}
              isConnectable={1}
            />
          </div>
        ))}
    </div>
    </div>
  );
}
export default Backnode;