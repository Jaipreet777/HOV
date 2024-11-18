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