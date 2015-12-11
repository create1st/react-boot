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

package com.create.application.configuration;

import com.create.stomp.IncomingRequestEventHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class StompConfiguration {

    private static class StompConfigurer extends AbstractWebSocketMessageBrokerConfigurer {

        private final String endPoint;

        private final String destination;

        public StompConfigurer(final String endPoint, final String destination) {
            this.endPoint = endPoint;
            this.destination = destination;
        }

        @Override
        public void registerStompEndpoints(final StompEndpointRegistry registry) {
            registry.addEndpoint(endPoint).withSockJS();
        }

        @Override
        public void configureMessageBroker(final MessageBrokerRegistry registry) {
            registry.enableSimpleBroker(destination);
        }
    }

    @Bean
    @Autowired
    public StompConfigurer stompConfigurer(final @Value("${stomp.endPoint}") String endPoint, final @Value("${stomp.destination.topic}") String destination) {
        return new StompConfigurer(endPoint, destination);

    }

    @Bean
    @Autowired
    public IncomingRequestEventHandler incomingRequestEventHandler(final SimpMessagingTemplate template, final @Value("${stomp.destination.topic}") String destination, final @Value("${stomp.destination.name.incomingRequest}") String name) {
        return new IncomingRequestEventHandler(template, destination + name);
    }
}
