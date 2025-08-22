    // {/* Admin Panel Modal */}
    //   {adminMode && (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    //       <div className="bg-white rounded-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
    //         <div className="flex justify-between items-center mb-6">
    //           <h3 className="text-2xl font-bold text-navy">Review Management</h3>
    //           <button onClick={() => setAdminMode(false)} className="text-gray-400 hover:text-gray-600">
    //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    //             </svg>
    //           </button>
    //         </div>

    //         <div className="mb-8">
    //           <h4 className="text-lg font-semibold text-navy mb-4">Pending Reviews ({pendingReviews.length})</h4>
    //           {pendingReviews.length > 0 ? (
    //             <div className="space-y-4">
    //               {pendingReviews.map(review => (
    //                 <div key={review.id} className="border border-gray-200 rounded-lg p-4">
    //                   <div className="flex items-center mb-2">
    //                     <div className="text-yellow-400 text-xl">
    //                       {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
    //                     </div>
    //                     <span className="ml-2 text-sm text-gray-500">{review.date}</span>
    //                   </div>
    //                   <h5 className="font-semibold text-navy">{review.title}</h5>
    //                   <p className="text-charcoal mb-2">{review.content}</p>
    //                   <div className="text-sm text-gray-500">
    //                     By {review.name} from {review.location} - {review.device}
    //                   </div>
    //                   <div className="flex space-x-2 mt-3">
    //                     <button
    //                       onClick={() => handleReviewStatusChange(review.id, "approved")}
    //                       className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
    //                     >
    //                       Approve
    //                     </button>
    //                     <button
    //                       onClick={() => handleReviewStatusChange(review.id, "rejected")}
    //                       className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
    //                     >
    //                       Reject
    //                     </button>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           ) : (
    //             <p className="text-charcoal">No pending reviews.</p>
    //           )}
    //         </div>

    //         <div>
    //           <h4 className="text-lg font-semibold text-navy mb-4">Approved Reviews ({approvedReviews.length})</h4>
    //           {approvedReviews.length > 0 ? (
    //             <div className="space-y-4">
    //               {approvedReviews.slice(0, 3).map(review => (
    //                 <div key={review.id} className="border border-gray-200 rounded-lg p-4">
    //                   <div className="flex items-center mb-2">
    //                     <div className="text-yellow-400 text-xl">
    //                       {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
    //                     </div>
    //                     <span className="ml-2 text-sm text-gray-500">{review.date}</span>
    //                   </div>
    //                   <h5 className="font-semibold text-navy">{review.title}</h5>
    //                   <p className="text-charcoal mb-2">{review.content}</p>
    //                   <div className="text-sm text-gray-500">
    //                     By {review.name} from {review.location} - {review.device}
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           ) : (
    //             <p className="text-charcoal">No approved reviews.</p>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   )}