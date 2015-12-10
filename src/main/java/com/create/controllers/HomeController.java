package com.create.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    public static final String INDEX_TEMPLATE = "index";

    @RequestMapping(value = "/")
    public String index() {
        return INDEX_TEMPLATE;
    }
}
