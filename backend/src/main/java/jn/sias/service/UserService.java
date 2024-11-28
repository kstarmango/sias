package jn.sias.service;

import jn.sias.domain.User;
import jn.sias.dto.UserDto;
import jn.sias.repository.UserRepository;
import jn.sias.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

//@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDto test() {
        User entity = userRepository.findById(1L);
        return userMapper.toDto(entity);
    }
}
