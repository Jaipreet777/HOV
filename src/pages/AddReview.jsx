import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const AddReview = () => {
  const { id } = useParams(); // Product ID from URL
  const [reviewer, setReviewer] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddReview = async () => {
    try {
      const productRef = doc(db, "products", id); // Reference to product document
      await updateDoc(productRef, {
        reviews: arrayUnion({
          reviewer,
          comment,
          rating: parseInt(rating),
        }),
      });
      alert("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div>
      <h2>Add Review</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddReview();
        }}
      >
        <div>
          <label>Reviewer Name:</label>
          <input
            type="text"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            min="1"
            max="5"
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;