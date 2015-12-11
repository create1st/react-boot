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

import com.create.model.IncomingRequest;
import com.create.repository.IncomingRequestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * {@link com.create.model.IncomingRequest} generator
 */
public class IncomingRequestGenerator {
    private static Logger log = LoggerFactory.getLogger(IncomingRequestGenerator.class);

    private final IncomingRequestRepository incomingRequestRepository;

    private final SimpMessagingTemplate template;

    private final String destination;

    public IncomingRequestGenerator(final IncomingRequestRepository incomingRequestRepository, final SimpMessagingTemplate template, final String destination) {
        this.incomingRequestRepository = incomingRequestRepository;
        this.template = template;
        this.destination = destination;
    }

    @Scheduled(fixedRate = 30_000)
    public void createIncomingRequest() {

        log.debug("createIncomingRequest");
        final IncomingRequest savedEntity = incomingRequestRepository.save(new IncomingRequest());

        template.convertAndSend(destination, savedEntity);
        log.debug("incomingRequest count : {}", incomingRequestRepository.count());
    }
}
