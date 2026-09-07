package com.smartfarmer.repository;

import com.smartfarmer.model.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderHistory, Long> {
}