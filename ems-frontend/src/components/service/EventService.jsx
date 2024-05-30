import axios from 'axios';

class EventService {
    static BASE_URL = "http://localhost:8090/api/v1/events";

    static async getAllEvents(token) {
        try {
            const response = await axios.get(EventService.BASE_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async createEvent(event, token) {
        try {
            const response = await axios.post(EventService.BASE_URL, event, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getEventById(eventId, token) {
        try {
            const response = await axios.get(`${EventService.BASE_URL}/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async updateEvent(eventId, event, token) {
        try {
            const response = await axios.put(`${EventService.BASE_URL}/${eventId}`, event, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteEvent(eventId, token) {
        try {
            const response = await axios.delete(`${EventService.BASE_URL}/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default EventService;
