/*
 * Copyright 2015 Sebastian Gil.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.create.scheduler;

import com.create.model.Person;
import com.create.model.Ticket;
import com.create.repository.PersonRepository;
import com.create.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;
import java.util.Random;

/**
 * {@link Ticket} generator for simulation and testing purpose
 */
public class TicketGenerator {
    private static Logger log = LoggerFactory.getLogger(TicketGenerator.class);

    private final TicketRepository ticketRepository;

    private final PersonRepository personRepository;

    private final SimpMessagingTemplate template;

    private final String destination;

    private final Random random;

    public TicketGenerator(final TicketRepository ticketRepository, final PersonRepository personRepository, final SimpMessagingTemplate template, final String destination) {
        this.ticketRepository = ticketRepository;
        this.personRepository = personRepository;
        this.template = template;
        this.destination = destination;
        this.random = new Random();
    }


    @Scheduled(fixedRate = 30_000)
    public void createTicket() {
        log.debug("createTicket");

        final List<Person> persons = personRepository.findAll();
        final Person owner = persons.get(random.nextInt(persons.size()));
        final Ticket savedEntity = ticketRepository.save(new Ticket(owner));

        template.convertAndSend(destination, savedEntity);
        log.debug("Tickets count : {}", ticketRepository.count());
    }
}
