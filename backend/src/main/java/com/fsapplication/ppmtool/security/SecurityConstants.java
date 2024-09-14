package com.fsapplication.ppmtool.security;

public class SecurityConstants {
    public static final String LOGIN_URL = "/api/users/login";
    public static final String SIGNUP_URL = "/api/users/register";
    public static final String H2_URL = "h2-console/**";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 3600000; // 3600000 1h (300_000 valid for 5 minutes)
}
