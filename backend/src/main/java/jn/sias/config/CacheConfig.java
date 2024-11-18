package jn.sias.config;

import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
//@EnableCaching
public class CacheConfig {

//    @Bean
//    public CacheManager cacheManager() {
//        return CacheManagerBuilder.newCacheManagerBuilder()
//                .withCache("searchCache",
//                        CacheConfigurationBuilder.newCacheConfigurationBuilder(
//                                        String.class, List.class, // Key: String, Value: List<String>
//                                        org.ehcache.config.builders.ResourcePoolsBuilder.heap(100)) // 최대 100개 항목
//                        .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofHours(10))) // 10시간 만료
//                )
//                .build(true);
//    }



}
