import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Import your Firestore configuration
import { collection, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Import EmailJS

const localizer = momentLocalizer(moment);

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if user is not authenticated
      } else {
        const fetchUserRole = async () => {
          try {
            const usersCollection = collection(db, 'Users');
            const userSnapshot = await getDocs(usersCollection);
            const userDoc = userSnapshot.docs.find(
              (doc) => doc.data().UID === user.uid
            );

            if (userDoc) {
              if (userDoc.data().Role === 'Admin') {
                setIsAdmin(true);
              } else {
                navigate('/'); // Redirect if user is not admin
              }
            } else {
              navigate('/'); // Redirect if user document not found
            }
          } catch (error) {
            console.error('Error fetching user role:', error);
            navigate('/'); // Redirect on error
          }
        };

        await fetchUserRole();
        setLoading(false); // Set loading to false after fetching user role
      }
    });

    // Fetch appointments from Firestore
    const unsubscribeAppointments = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const appointmentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentsData);
    });

    return () => {
      unsubscribe();
      unsubscribeAppointments();
    };
  }, [navigate]);

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Approved' : 'Pending';
    const appointmentRef = doc(db, 'appointments', id);

    try {
      await updateDoc(appointmentRef, { status: newStatus });
      alert(`Appointment status updated to ${newStatus}`);

      // Fetch customer info to send email
      const appointment = appointments.find(app => app.id === id);
      if (appointment && newStatus === 'Approved') {
        sendConfirmationEmail(appointment);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

 // Function to send confirmation email
const sendConfirmationEmail = (appointment) => {
    // Format the date and time using moment
    const formattedDate = moment(appointment.date).format('MMMM Do YYYY, h:mm A'); // Example: December 3rd 2024, 7:00 PM
  
    const templateParams = {
      name: appointment.name, // Name of the customer
      email: appointment.email, // Customer's email address
      appointmentDetails: `Your appointment on ${formattedDate} has been confirmed.` // Custom appointment details with formatted date
    };
  
    emailjs.send(
      'service_j6fhxqb',  // Your EmailJS Service ID
      'template_qy4toha', // Your EmailJS Template ID
      templateParams,
      'vcT2qOgsaMvhG7Ug4' // Your EmailJS API Key
    )
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    }, (error) => {
      console.error('Failed to send email:', error);
    });
  };
  

  const events = appointments.map(appointment => ({
    id: appointment.id,
    title: `${appointment.name} - ${appointment.status}`,
    start: new Date(appointment.date),
    end: new Date(new Date(appointment.date).getTime() + 60 * 60 * 1000), // Assuming 1-hour duration
  }));

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!isAdmin) {
    return <div className="text-red-500 text-xl">No Access</div>; // Show no access message
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Appointment Requests</h1>
      <div style={{ height: '600px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: '50px' }}
          onSelectEvent={(event) => handleStatusChange(event.id, event.title.split(' - ')[1])}
          selectable
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

//ChatGPT - Give me an Admin Dashboard in React for managing appointments
//https://www.w3schools.com