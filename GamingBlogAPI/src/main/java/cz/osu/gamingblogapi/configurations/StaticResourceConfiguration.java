package cz.osu.gamingblogapi.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class StaticResourceConfiguration implements WebMvcConfigurer {
    private final StaticFileConfiguration _staticFileConfiguration;

    public StaticResourceConfiguration(StaticFileConfiguration staticFileConfiguration) {
        _staticFileConfiguration = staticFileConfiguration;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler(_staticFileConfiguration.getResourcePath())
                .addResourceLocations(_staticFileConfiguration.getImageFilePath());
    }
}
