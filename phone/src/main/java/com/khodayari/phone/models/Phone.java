package com.khodayari.phone.models;

import java.util.ArrayList;
import java.util.List;

public class Phone {
	
	private String[] Letters = {"0","1","2abc", "3def","4ghi", "5jkl", "6mno", "7pqrs", "8tuv", "9wxyz"};
	private String number;
	private List<PhoneNumber> alphaNumCombs;

	// constructor
	public Phone(String _number) {
		number =_number;
		alphaNumCombs= new ArrayList<>();
		
		// find all combinations
		generateWord(this.number,0,"");
	}
	
	// getter for combinations
	public List<PhoneNumber> ListOfPhoneNumbers() {
		 
		return alphaNumCombs;
	}

	// getter for number
	public String getNumber() {
		return number;
	}

	//use recursive function to generate all combinations
	//generates all combinations of words for the given phone number and prints out only the real words
	public  void generateWord(String pNumber, int index, String wordSoFar){
		
		if(pNumber.length() == wordSoFar.length()){
			alphaNumCombs.add(new PhoneNumber(wordSoFar));
					return;
		}
		else {
			String val = pNumber.substring(index, index+1);
			int num = Integer.parseInt(val);
			
			for(int i = 0; i<5; i++) {
				
				if (	(i==0 && num <= 1) || // handles 0,1
						( i<4 && (num > 1 ) ) ||  //handles the first three digits for 2,3,4,5,6,7,8,9
						(i==4 && (num == 7 || num == 9)) //handles fourth digit for 7,9
						) {

					String letterToAdd = Letters[num].substring(i,i+1);
					generateWord(pNumber, index+1, wordSoFar + letterToAdd);
				}
			}
		}
	}	
	
}
