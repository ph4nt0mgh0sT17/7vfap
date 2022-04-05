package cz.osu.gamingblogapi.configurations;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("sfc")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticFileConfiguration {
    private String imageFilePath;
    private String resourcePath;
}
