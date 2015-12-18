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

import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

@Configuration
@ComponentScan(basePackages = "com.create.controller")
public class WebConfiguration {
    public class ServerCustomization extends ServerProperties {

        @Override
        public void customize(ConfigurableEmbeddedServletContainer container) {
            super.customize(container);
            container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/error/404.html"));
            container.addErrorPages(new ErrorPage("/error/error.html"));
        }

    }

    @Bean
    public ServerProperties getServerProperties() {
        return new ServerCustomization();
    }
}
