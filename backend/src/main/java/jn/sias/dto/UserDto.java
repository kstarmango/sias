package jn.sias.dto;


import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserDto {
    String username;
    String email;
}
