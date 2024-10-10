package jn.sias.service.mapper;

import jn.sias.domain.User;
import jn.sias.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface UserMapper {
    UserDto toDto(User user);
}
