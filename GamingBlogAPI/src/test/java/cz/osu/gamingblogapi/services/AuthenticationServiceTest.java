package cz.osu.gamingblogapi.services;

import cz.osu.gamingblogapi.exceptions.EntityDoesNotExistException;
import cz.osu.gamingblogapi.exceptions.WrongUserCredentialsException;
import cz.osu.gamingblogapi.models.User;
import cz.osu.gamingblogapi.models.UserRole;
import cz.osu.gamingblogapi.repositories.IUserRepository;
import cz.osu.gamingblogapi.requests.LoginRequest;
import cz.osu.gamingblogapi.responses.LoginResponse;
import cz.osu.gamingblogapi.services.interfaces.IAuthenticationService;
import cz.osu.gamingblogapi.services.interfaces.IJwtService;
import cz.osu.gamingblogapi.utilities.HashHelper;
import org.junit.jupiter.api.*;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AuthenticationServiceTest {
    private IAuthenticationService _authenticationService;
    private IUserRepository _userRepository;
    private IJwtService _jwtService;
    private ModelMapper _modelMapper;

    @BeforeEach
    void setUp() {
        _userRepository = mock(IUserRepository.class);
        _jwtService = mock(IJwtService.class);
        _modelMapper = mock(ModelMapper.class);
        _authenticationService = new AuthenticationService(_userRepository, _jwtService, _modelMapper);
    }

    @Order(1)
    @DisplayName("login() throws EntityDoesNotExistException when user does not exist")
    @Test
    public void test_Login_ThrowsEntityDoesNotExistException_WhenWrongCredentialsGiven() {
        // Arrange
        when(_userRepository.findOne(any(Specification.class)))
                .thenThrow(new EntityDoesNotExistException());

        var loginRequest = new LoginRequest("David", "Password");

        // Act + Assert
        assertThrows(EntityDoesNotExistException.class, () -> _authenticationService.login(loginRequest));
    }

    @Order(2)
    @DisplayName("login() throws WrongUserCredentialsException when wrong credentials are given")
    @Test
    public void test_Login_ThrowsWrongUserCredentialsException_WhenWrongCredentialsGiven() {
        // Arrange
        var user = new User();
        user.setPassword(HashHelper.hashPassword("WrongPassword"));
        when(_userRepository.findOne(any(Specification.class)))
                .thenReturn(Optional.of(user));

        var loginRequest = new LoginRequest("David", "Password");

        // Act + Assert
        assertThrows(WrongUserCredentialsException.class, () -> _authenticationService.login(loginRequest));
    }

    @Order(3)
    @DisplayName("login() throws IllegalStateException when ModelMapper cannot map the User to LoginResponse")
    @Test
    public void test_Login_ThrowsIllegalStateException_WhenModelMapperCannotMap() {
        // Arrange
        var user = new User();
        user.setPassword(HashHelper.hashPassword("Password"));
        when(_userRepository.findOne(any(Specification.class)))
                .thenReturn(Optional.of(user));

        when(_modelMapper.map(any(User.class),eq(LoginResponse.class))).thenThrow(new RuntimeException());

        var loginRequest = new LoginRequest("David", "Password");

        // Act + Assert
        assertThrows(IllegalStateException.class, () -> _authenticationService.login(loginRequest));
    }

    @Order(4)
    @DisplayName("login() throws IllegalStateException when JWT service cannot create JWT token")
    @Test
    public void test_Login_ThrowsIllegalStateException_WhenJwtServiceCannotCreateToken() {
        // Arrange
        var user = new User();
        user.setPassword(HashHelper.hashPassword("Password"));
        when(_userRepository.findOne(any(Specification.class)))
                .thenReturn(Optional.of(user));

        when(_modelMapper.map(any(User.class),eq(LoginResponse.class)))
                .thenReturn(new LoginResponse("David", UserRole.ROLE_ADMIN, null));

        when(_jwtService.createJwtToken(anyString(), anyString())).thenThrow(new RuntimeException());

        var loginRequest = new LoginRequest("David", "Password");

        // Act + Assert
        assertThrows(IllegalStateException.class, () -> _authenticationService.login(loginRequest));
    }
}
