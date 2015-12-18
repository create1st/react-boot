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

package com.create.model;

import org.springframework.data.annotation.Id;

public class Ticket {

    @Id
    private String id;

    private Person owner;

    private Person assigned;

    public Ticket() {
    }

    public Ticket(final String id, final Person owner) {
        this.id = id;
        this.owner = owner;
    }

    public Ticket(final Person owner) {
        this(null, owner);
    }

    public String getId() {
        return id;
    }

    public Person getOwner() {
        return owner;
    }

    public Person getAssigned() {
        return assigned;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id='" + id + '\'' +
                ", owner=" + owner +
                ", assigned=" + assigned +
                '}';
    }
}
