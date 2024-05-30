package com.emsbackend.springboots.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

    @Column(name = "location")
    private String location;
}
