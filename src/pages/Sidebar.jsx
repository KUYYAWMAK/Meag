import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Nexus</h1>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Home</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">About</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Services</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Contact</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;