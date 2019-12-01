package com.khodayari.phone.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khodayari.phone.models.Phone;
import com.khodayari.phone.models.PhoneInfo;
import com.khodayari.phone.models.PhoneNumber;

@RestController
@RequestMapping("/api/phones")
public class PhonesController {
	@GetMapping("/{number}/{pageIndex}/{pageSizeSel}")
	public ResponseEntity<PhoneInfo> getPhoneInfo(
			@PathVariable("number") String number,
			@PathVariable("pageIndex") int page,
			@PathVariable("pageSizeSel") int limit) {

		/*
		 * 
		 * sample call: http://localhost:8080/api/phones/3013406645/1/10
		 */
		
		//Instantiate a Phone
		Phone phone = new Phone(number);
		
		// get the combinations
		List<PhoneNumber> phones = phone.ListOfPhoneNumbers(); 

		// find start and end to return
		int start=(page-1)* limit;
		int end=(page* limit );
		
		if (end>phones.size()) end=phones.size();
		
		List<PhoneNumber> phonesSub=new ArrayList<PhoneNumber>(phones.subList(start,end));
		
		PhoneInfo phoneInfo = new PhoneInfo(phones.size(),phonesSub);
		
		return  ResponseEntity.ok().body(phoneInfo);
		
		
	}

	
}
