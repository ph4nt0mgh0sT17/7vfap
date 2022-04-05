package cz.osu.gamingblogapi.services;

import cz.osu.gamingblogapi.configurations.JwtConfiguration;
import cz.osu.gamingblogapi.services.interfaces.IJwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService implements IJwtService {
    private final JwtConfiguration _jwtConfiguration;

    public JwtService(JwtConfiguration _jwtConfiguration) {
        this._jwtConfiguration = _jwtConfiguration;
    }

    public String createJwtToken(String username, String role) {
        String secretKey = _jwtConfiguration.getSecretKey();
        var grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(role)
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return Jwts.builder()
                .setId("gaming-blog")
                .setSubject(username)
                .claim("authorities", grantedAuthorities)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SignatureAlgorithm.HS512, secretKey.getBytes())
                .compact();
    }
}
