"use client";

import React, { useState } from 'react';
import { db } from '../firebase'; // Import your Firestore reference
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions