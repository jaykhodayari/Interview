package com.khodayari.phone;

import org.junit.Assert;
import org.junit.Test;

import com.khodayari.phone.models.Phone;

import junit.framework.TestCase;

public class TestPhone extends TestCase {

	Phone p = new Phone("3013406645");
	
	@Test
	public void testPhoneCombinationsCount() {
		// tests Phone class
		Assert.assertTrue(p.ListOfPhoneNumbers().size()==16384);
		
		Assert.assertTrue(
				p.ListOfPhoneNumbers().get(0).getNumber().equals("3013406645"));
		
		Assert.assertTrue(
				p.ListOfPhoneNumbers().get(1).getNumber().equals("301340664j"));
	}

	
}
