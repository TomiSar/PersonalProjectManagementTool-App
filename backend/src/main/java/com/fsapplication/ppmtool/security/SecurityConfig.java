package com.fsapplication.ppmtool.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(
        prePostEnabled = true,  // Enables @PreAuthorize and @PostAuthorize annotations
        securedEnabled = true,  // Enables @Secured annotation
        jsr250Enabled = true    // Enables @RolesAllowed annotation
)
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Configures CORS, Not using Cookies for session tracking >> disable CSRF (Cross Site Request Forgery)
        // Configures the custom authentication entry point.
        // Configures session management to be stateless.
        // Configures headers to allow same-origin frame options. This is useful for enabling H2 Database console.
        // Configures URL patterns and permissions.
        http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))  //To enable H2 Database
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(
                                "/",
                                "/favicon.ico",
                                "/*/*.png",
                                "/*/*.gif",
                                "/*/*.svg",
                                "/*/*.jpg",
                                "/*/*.html",
                                "/*/*.css",
                                "/*/*.js"
                        ).permitAll()
                        .requestMatchers("/api/users/**").permitAll().anyRequest().authenticated());

        // Secure your API endpoints
        // Adds the JWT filter to the security filter chain.

        return http.build();
    }
}