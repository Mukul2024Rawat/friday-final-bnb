import React, { useState } from 'react';

import BookingTable from '@/components/host/BookingTable' // Adjust the path as necessary

const Dashboard = () => {

    return (

        <>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-4 py-6">
                    <BookingTable /> {/* Include the BookingTable component */}
                </div>
            </main>

        </>
    );
};

export default Dashboard;