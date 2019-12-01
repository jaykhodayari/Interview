package com.khodayari.phone.models;

import java.util.List;

public class PhoneInfo {
	int total;
	private List<PhoneNumber> alphaNumCombs;
	
	public PhoneInfo( int _total, List<PhoneNumber> _alphaNumCombs ) {
		
		setTotal(_total);
		setAlphaNumCombs(_alphaNumCombs);
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<PhoneNumber> getAlphaNumCombs() {
		return alphaNumCombs;
	}

	public void setAlphaNumCombs(List<PhoneNumber> alphaNumCombs) {
		this.alphaNumCombs = alphaNumCombs;
	}

}
