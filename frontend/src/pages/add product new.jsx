"use client";

import React, { useState } from 'react';
import { db } from '../firebase'; // Import your Firestore reference
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
const categories = ['Electronics', 'Fashion', 'Home Appliances', 'Books', 'Toys', 'Beauty', 'Sports'];

export default function AddProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const handleImagePreview = (url) => {
    setImageUrl(url);
    setImagePreview(url);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !category || !price || !stock || !description || !imageUrl) {
    alert('Please fill in all fields.');
    return;
  }
  try {
    await addDoc(collection(db, 'products'), {
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      description,
        imageUrl,
      });
      alert('Product added successfully!');
      setName('');
      setCategory('');
      setPrice('');
      setStock('');
      setDescription('');
      setStock('');
      setDescription('');
      setImageUrl('');
      setImagePreview('');
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Failed to add product.');
    }
  };
  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Add Product</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input