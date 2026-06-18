package com.xeno.xenocrm.repository;

import com.xeno.xenocrm.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import com.xeno.xenocrm.repository.CustomerRepository;
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);
    long count();
}
