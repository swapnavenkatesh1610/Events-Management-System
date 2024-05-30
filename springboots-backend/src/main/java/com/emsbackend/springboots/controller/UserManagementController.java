package com.emsbackend.springboots.controller;

import com.emsbackend.springboots.Repository.EventRepository;
import com.emsbackend.springboots.dto.ReqRes;
import com.emsbackend.springboots.execution.ResourceNotFoundException;
import com.emsbackend.springboots.model.OurUsers;
import com.emsbackend.springboots.service.UsersManagementService;
import com.emsbackend.springboots.model.Event;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class UserManagementController {

    @Autowired
    private UsersManagementService usersManagementService;

    @Autowired
    private EventRepository eventRepository;

    // User Registration
    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes reg) {
        reg.setMessage("User registered successfully");
        return ResponseEntity.ok(usersManagementService.register(reg));
    }

    // User Login
    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req) {
        return ResponseEntity.ok(usersManagementService.login(req));
    }

    // Token Refresh
    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req) {
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }

    // Get All Users (Admin)
    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers() {
        return ResponseEntity.ok(usersManagementService.getAllUsers());
    }

    // Get User by ID (Admin)
    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRes> getUserByID(@PathVariable Integer userId) {
        return ResponseEntity.ok(usersManagementService.getUsersById(userId));
    }

    // Update User (Admin)
    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody OurUsers reqres) {
        return ResponseEntity.ok(usersManagementService.updateUser(userId, reqres));
    }

    // Get My Profile
    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = usersManagementService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Delete User (Admin)
    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(usersManagementService.deleteUser(userId));
    }

    // Other user management endpoints (register, login, etc.) remain unchanged...

    // Get All Events
    @GetMapping("/api/v1/events")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return ResponseEntity.ok(events);
    }

    // Create Event
    @PostMapping("/api/v1/events")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event savedEvent = eventRepository.save(event);
        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
    }

    // Get Event by ID
    @GetMapping("/api/v1/events/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not exist with id: " + id));
        return ResponseEntity.ok(event);
    }

    // Update Event
    @PutMapping("/api/v1/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable long id, @RequestBody Event eventDetails) {
        Event updateEvent = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        updateEvent.setTitle(eventDetails.getTitle());
        updateEvent.setDescription(eventDetails.getDescription());
        updateEvent.setDateTime(eventDetails.getDateTime());
        updateEvent.setLocation(eventDetails.getLocation());

        Event updatedEvent = eventRepository.save(updateEvent);
        return ResponseEntity.ok(updatedEvent);
    }

    // Delete Event
    @DeleteMapping("/api/v1/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not exist with id: " + id));

        eventRepository.delete(event);

        return ResponseEntity.noContent().build();
    }

    // Get Reminding Events
    @GetMapping("/api/v1/events/reminders")
    public ResponseEntity<List<Event>> getRemindingEvents() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime reminderTime = now.plusDays(7);  // Assuming reminders are for events in the next 7 days
        List<Event> events = eventRepository.findByDateTimeBetween(now, reminderTime);
        return ResponseEntity.ok(events);
    }
}