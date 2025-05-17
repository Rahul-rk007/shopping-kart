import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { fetchSuccessMessage } from '../../api/checkoutApi'; // Import the API function

const PaymentSuccessfull = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Call the API when the component mounts
    const getSuccessMessage = async () => {
      try {
        const message = await fetchSuccessMessage(); // Use the API function
        setMessage(message); // Set the message from the API response
      } catch (error) {
        setMessage('Payment completed successfully!'); // Fallback message
      }
    };

    getSuccessMessage();
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="shadow-lg p-4 text-center" style={{ maxWidth: '420px', borderRadius: '15px' }}>
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 9.439 5.525 7.464a.75.75 0 1 0-1.06 1.06l2.505 2.506z" />
            </svg>
          </div>
          <h2 className="mb-3 fw-bold">Payment Successful!</h2>
          <p className="mb-4 text-secondary">
            {message}
          </p>
          <button className=" btn-red btn btn-success btn-lg rounded-pill px-5" onClick={() => window.location.href = '/myaccount/myorders'}>
            Go to My Order
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentSuccessfull;