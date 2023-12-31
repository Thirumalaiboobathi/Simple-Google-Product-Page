import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css'; // Import your CSS for table styling

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://658fe2b9cbf74b575eca3731.mockapi.io/project1')
      .then(response => {
        setData(response.data);
        setLoading(false); // Update loading status once data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Update loading status in case of error
      });
  }, []);

  return (
    <div>
      <h1>Placed Orders</h1>
      <div className="admin-access-text">
  
          <p className="admin-message">
            Welcome, Administrator. Accessing exclusive content reserved for admins.
            This section is exclusively accessible to administrators for authorized access.
          </p>
        
      </div>
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <table className="custom-table">
                  <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Product name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.contactNumber}</td>
              <td>{item.address}</td>
              <td>{item.city}</td>
              <td>{item.country}</td>
              <td>{item.productName}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponent;
