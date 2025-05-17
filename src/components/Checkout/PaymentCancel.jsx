import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { fetchCancelMessage } from '../../api/checkoutApi'; // Import the API function

const PaymentCancel = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Call the API when the component mounts
    const getCancelMessage = async () => {
      try {
        const message = await fetchCancelMessage(); // Use the API function
        setMessage(message); // Set the message from the API response
      } catch (error) {
        setMessage('Your payment was not completed.'); // Fallback message
      }
    };

    getCancelMessage();
  }, []);

  return (
    <Layout>
      <div className=" d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="shadow-lg p-4 text-center" style={{ maxWidth: '420px', borderRadius: '15px' }}>
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 1 0-.708.708L7.293 8 3.938 11.354a.5.5 0 0 0 .707.707L8 8.707l3.354 3.354a.5.5 0 0 0 .707-.707L8.707 8l3.354-3.354a.5.5 0 0 0-.707-.707L8 7.293 4.646 4.646z"/>
            </svg>
          </div>
          <h2 className="mb-3 text-danger fw-bold">Payment Cancelled</h2>
          <p className="mb-4 text-secondary">
            {message}
          </p>
          <button className="btn btn-danger btn-lg rounded-pill px-5" onClick={() => window.location.href = '/'}>
            Return Home
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentCancel;