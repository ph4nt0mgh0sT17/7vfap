package cz.osu.gamingblogapi.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    final JwtConfiguration _jwtConfiguration;
    final StaticFileConfiguration _staticFileConfiguration;

    public WebSecurityConfiguration(JwtConfiguration jwtConfiguration, StaticFileConfiguration staticFileConfiguration) {
        _jwtConfiguration = jwtConfiguration;
        _staticFileConfiguration = staticFileConfiguration;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf()
                .disable()

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
                }).and()

                .addFilterAfter(new JwtAuthorizationFilter(_jwtConfiguration), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/api/authentication/**").permitAll()
                .antMatchers("/api/category").permitAll()
                .antMatchers("/api/posts/**").permitAll()
                .antMatchers("/api/post-reactions/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/post-reactions/[0-9]+").authenticated()
                .antMatchers("/api/post-comments/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/post-comments/[0-9]+").authenticated()
                .antMatchers(HttpMethod.POST, "/api/post-comments/[0-9]+").authenticated()
                .antMatchers("/api/images/**").authenticated()
                .antMatchers(_staticFileConfiguration.getResourcePath()).permitAll()
                .anyRequest().authenticated();
    }
}
