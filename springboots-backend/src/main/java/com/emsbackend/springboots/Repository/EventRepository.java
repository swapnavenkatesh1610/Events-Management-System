package com.emsbackend.springboots.Repository;

import com.emsbackend.springboots.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {
    List<Event> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);
}
