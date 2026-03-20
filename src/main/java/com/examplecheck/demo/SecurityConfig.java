 package com.examplecheck.demo;

 import org.springframework.context.annotation.Bean;
 import org.springframework.context.annotation.Configuration;
 import org.springframework.security.config.Customizer;
 import org.springframework.security.config.annotation.web.builders.HttpSecurity;
 import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
 import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
 import org.springframework.security.web.SecurityFilterChain;


 @Configuration
 @EnableWebSecurity
 public class SecurityConfig {

     @Bean
     public SecurityFilterChain securityfilterchain(HttpSecurity http) throws Exception {
         http
                 .csrf(csrf -> csrf.disable())
                 .authorizeHttpRequests(auth -> auth
                         .requestMatchers("/h2-console/**").permitAll() // 🔥 allow h2
                         .anyRequest().permitAll()
                 )
                 .headers(headers -> headers
                         .frameOptions(frame -> frame.disable()) // 🔥 IMPORTANT
                 );

         return http.build();
     }

 }

