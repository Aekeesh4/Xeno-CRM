package com.xeno.xenocrm.repository;

import com.xeno.xenocrm.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository
        extends JpaRepository<Activity, Long> {

    List<Activity> findTop10ByOrderByCreatedAtDesc();

}