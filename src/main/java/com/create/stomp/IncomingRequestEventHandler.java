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

package com.create.stomp;

import com.create.model.IncomingRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.messaging.simp.SimpMessagingTemplate;

/**
 * Rest data repository handler for {@link com.create.model.IncomingRequest}
 */
@RepositoryEventHandler(IncomingRequest.class)
public class IncomingRequestEventHandler {
    private static final Logger log = LoggerFactory.getLogger(IncomingRequestEventHandler.class);

    private final SimpMessagingTemplate template;

    private final String destination;

    public IncomingRequestEventHandler(final SimpMessagingTemplate template, final String destination) {
        this.template = template;
        this.destination = destination;
    }

    @HandleAfterCreate
    public void onIncomingRequest(final IncomingRequest incomingRequest) {
        log.debug("onIncomingRequest : {}", incomingRequest);

        template.convertAndSend(destination, incomingRequest);
    }
}
