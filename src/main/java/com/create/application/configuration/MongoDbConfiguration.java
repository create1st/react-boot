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

import com.create.repository.PersonRepository;
import com.create.repository.TicketRepository;
import com.create.repository.loader.PersonLoader;
import com.create.repository.loader.TicketLoader;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories({
        "com.create.repository"
})
@EnableAutoConfiguration
public class MongoDbConfiguration {

    @Bean
    public PersonLoader personLoader(final PersonRepository personRepository) {
        return new PersonLoader(personRepository);
    }

    @Bean
    public TicketLoader ticketLoader(final TicketRepository ticketRepository, final PersonRepository personRepository) {
        return new TicketLoader(ticketRepository, personRepository);
    }
}
