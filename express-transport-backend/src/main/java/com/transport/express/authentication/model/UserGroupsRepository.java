package com.transport.express.authentication.model;

import com.transport.express.common.model.Authority;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository // not necessary anyway?
public interface UserGroupsRepository extends MongoRepository<Authority, String> {
}
