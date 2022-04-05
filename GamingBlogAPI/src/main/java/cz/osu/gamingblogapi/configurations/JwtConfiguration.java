package cz.osu.gamingblogapi.configurations;

import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("jwt")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtConfiguration {
    private String secretKey;
}
