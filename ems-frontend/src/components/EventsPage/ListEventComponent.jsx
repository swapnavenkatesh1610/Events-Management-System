import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventService from '../service/EventService';
import '../styles.css'; // Ensure this points to the correct path

const ListEventComponent = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');

            const data = await EventService.getAllEvents(token);
            console.log('Fetched data:', data); // Debug log to verify data structure
            setEvents(data); // Assuming data is an array of events
        } catch (error) {
            console.error('Error fetching events:', error);
            setError(error.message || 'Unexpected error occurred');
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');

            await EventService.deleteEvent(eventId, token);
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
            setError(error.message || 'Unexpected error occurred');
        }
    };

    return (
        <div className="container event-list-container">
            <h2 className="text-center my-4">Events List</h2>
            <Link to="/add-event" className="btn btn-gradient mb-3">Add Event</Link>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date and Time</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <tr key={event.id}>
                                        <td className="event-title">{event.title}</td>
                                        <td className="event-description">{event.description}</td>
                                        <td className="event-date">{new Date(event.dateTime).toLocaleString()}</td>
                                        <td className="event-location">{event.location}</td>
                                        <td className="event-actions">
                                            <Link className="btn mixed-color-button" to={`/edit-event/${event.id}`}>Update</Link>
                                            <button className="btn mixed-color-button" onClick={() => deleteEvent(event.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No events found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListEventComponent;
