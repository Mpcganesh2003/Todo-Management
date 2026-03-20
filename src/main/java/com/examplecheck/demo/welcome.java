package com.examplecheck.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class welcome {
        
    @GetMapping("/hello") 
    String Welcome(){
        return "Welcome";
    }
}
