package com.fsapplication.ppmtool.security;

import com.fsapplication.ppmtool.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.fsapplication.ppmtool.security.SecurityConstants.EXPIRATION_TIME;

@Component
public class JwtTokenProvider {

    @Value("${JWT_SECRET}")
    private String jwtSecret;

    private SecretKey getSecretKey() {
        byte[] keyBytes = jwtSecret.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date validityTime = new Date(now.getTime() + EXPIRATION_TIME);
        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(user.getId())));
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validityTime)
                .signWith(getSecretKey())
                .compact();
    }

    //Validate the token
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(getSecretKey()).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException
                | UnsupportedJwtException | IllegalArgumentException ex){
            System.out.println("Exception: " + ex.getMessage());
        }
        return false;
    }

    //Get user Id from token
    public Long getUserIdFromJwt(String token){
        Claims claims = Jwts.parser().setSigningKey(getSecretKey()).build().parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");
        return Long.parseLong(id);
    }
}