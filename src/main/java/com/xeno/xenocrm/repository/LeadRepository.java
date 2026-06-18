package com.xeno.xenocrm.repository;

import com.xeno.xenocrm.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<Lead, Long> {
    long count();


    long countByStatus(String status);

}
