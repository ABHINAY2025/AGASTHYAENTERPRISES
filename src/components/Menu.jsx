import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="flex justify-center items-center h-screen">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/Allinvoices"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              All Invoices
            </Link>
          </li>
          <li>
            <Link
              to="/create-invoice"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Create Invoice
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
