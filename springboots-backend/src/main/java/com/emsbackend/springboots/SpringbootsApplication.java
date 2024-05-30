package com.emsbackend.springboots;

import com.emsbackend.springboots.Repository.EventRepository;
import com.emsbackend.springboots.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;

@SpringBootApplication
public class SpringbootsApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootsApplication.class, args);
	}
	@Autowired
	private EventRepository eventRepository;
	@Override
	public void run(String... args) throws Exception {
//		Event event = new Event();
//		event.setTitle("Sample Event");
//		event.setDescription("This is a sample event");
//		event.setDateTime(LocalDateTime.now());
//		event.setLocation("Sample Location");
//		eventRepository.save(event);
//
//		Event event1 = new Event();
//		event1.setTitle("Event");
//		event1.setDescription("sample event");
//		event1.setDateTime(LocalDateTime.now());
//		event1.setLocation("Different Location");
//		eventRepository.save(event1);


	}
}
