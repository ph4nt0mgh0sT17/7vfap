package cz.osu.gamingblogapi.services;

import cz.osu.gamingblogapi.repositories.IUserRepository;
import cz.osu.gamingblogapi.responses.UserResponse;
import cz.osu.gamingblogapi.services.interfaces.IUserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    private final IUserRepository _userRepository;
    private final ModelMapper _modelMapper;

    public UserService(IUserRepository userRepository, ModelMapper modelMapper) {
        _userRepository = userRepository;
        _modelMapper = modelMapper;
    }

    @Override
    public List<UserResponse> retrieveAllUsers() {
        var users = _userRepository.findAll();

        return users.stream()
                .map(x -> _modelMapper.map(x, UserResponse.class))
                .toList();
    }
}
