import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventService from '../service/EventService';

const AddEventComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchEvent(id);
        }
    }, [id]);

    const fetchEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');
    
            const event = await EventService.getEventById(eventId, token);
            if (!event) throw new Error('Event not found');
    
            setTitle(event.title || '');
            setDescription(event.description || '');
            setDateTime(event.dateTime ? event.dateTime.slice(0, 16) : ''); // Checking if dateTime is defined
            setLocation(event.location || '');
        } catch (error) {
            console.error('Error fetching event:', error);
            setError(error.message || 'Unexpected error occurred');
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !dateTime || !location) {
            setError('All fields are required');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');

            const event = { title, description, dateTime, location };

            if (id) {
                await EventService.updateEvent(id, event, token);
            } else {
                await EventService.createEvent(event, token);
            }

            navigate('/events');
        } catch (error) {
            console.error('Error saving/updating event:', error);
            setError(error.message || 'Unexpected error occurred');
        }
    };

    const handleCancel = () => {
        navigate('/events');
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">{id ? 'Update Event' : 'Add Event'}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date and Time</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                className="form-control"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                        <button type="button" className="btn btn-danger ml-2" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEventComponent;
