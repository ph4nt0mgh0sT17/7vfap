package cz.osu.gamingblogapi.configurations;

import org.modelmapper.ModelMapper;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

import static cz.osu.gamingblogapi.extensions.ModelMapperExtensions.createModelMapperWithAllMappings;

@Configuration
@EnableConfigurationProperties
@PropertySource("classpath:conf.properties")
public class GamingBlogConfiguration {
    @Bean
    public ModelMapper modelMapper() {
        return createModelMapperWithAllMappings();
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory multipartConfigFactory = new MultipartConfigFactory();
        multipartConfigFactory.setMaxFileSize(DataSize.ofMegabytes(2));
        multipartConfigFactory.setMaxRequestSize(DataSize.ofMegabytes(2));
        return multipartConfigFactory.createMultipartConfig();
    }
}
