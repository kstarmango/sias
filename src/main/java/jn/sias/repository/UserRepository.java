package jn.sias.repository;

import jn.sias.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
    User findById(Long id);
    User findByUsername(String username);
}
