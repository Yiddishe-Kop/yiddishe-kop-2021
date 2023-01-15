---
title: The Luhn Algorithm
description: Have you ever wondered how a website knows that the credit card or National ID number you mistyped is invalid?
createdAt: 2020-10-28
image: ex_p4AaBxbs
---

Have you ever wondered how a website knows that the credit card or National ID number you mistyped is invalid?

Do they have a list of all valid credit card numbers in the world?! Or the national ID numbers of all the citizens in the country?!

Turns out that they don't. So how do they know that the number is invalid? They use the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm).

### Introduction

From [Wikipedia](https://en.wikipedia.org/wiki/Luhn_algorithm):

<quote>

The Luhn algorithm, named after its creator, IBM scientist Hans Peter Luhn (in 1954), is a simple checksum formula used to validate a variety of identification numbers, such as credit card numbers, IMEI numbers, National Provider Identifier numbers in the United States, Canadian Social Insurance Numbers, Israeli ID Numbers, South African ID Numbers, Greek Social Security Numbers (ΑΜΚΑ), and more.

It is not intended to be a cryptographically secure hash function; it was designed to protect against accidental errors, not malicious attacks. Most credit cards and many government identification numbers use the algorithm as a simple method of distinguishing valid numbers from mistyped or otherwise incorrect numbers.

</quote>

To put it simply - the last number of every credit card and ID number is computed from the previous numbers with some mathematical algorithm. So we can just test if the last number is the result of that algorithm, and if it doesn’t we know the number is invalid.

### How it Works

When generating a credit card number, only the first 15 digits are generated, and the last number is calculated from them with the following algorithm:

Assume an example credit card number 4242 4242 4242 424**x** [**x** will be calculated now]:

1.  From the rightmost digit and moving left, double the value of every second digit, starting by doubling rightmost digit. If the result of this doubling operation is greater than 9 (e.g., 9 × 2 = 18), then add the digits of the result (e.g., 18: 1 + 8 = 9).
2.  For our example we get 8282 8282 8282 828.
3.  Sum of all the digits (78).
4.  Multiply by 9 (78 \* 9 = 702).
5.  Modulo 10 (702 % 10 = 2)

So there we got it: **x** = **2**, thereby finishing the nice credit card number pattern 4242 4242 4242 4242 😎.

And I always thought that the Stripe test card number is just a random number with no inner workings... 🤓

### Verifying a Number

To verify that a number passes the Luhn algorithm, do the following:

1.  Double every second digit, starting from the second digit to the right. If the result is more than 9, add the 2 digits to get a single number (as step 1 above).
2.  For our example we get 8282 8282 8282 8282.
3.  Sum all digits - including the last digit [the **check** digit] (80).
4.  If the total modulo 10 == 0 then the number is valid according to the Luhn algorithm. Else, the number is invalid.

### Laravel Luhn Validation

The [Laravel-luhn](https://github.com/marvinlabs/laravel-luhn) is a nice package that adds a `luhn` validator to use in Laravel applications.

To compute the check digit for a given number:

```php
Luhn::computeCheckDigit($number);
```

To validate that a number is valid according to the Luhn algorithm:

```php
Luhn::isValid($number);

// or as a validation rule
$request->validate([
   'credit_card' => 'luhn'
]);
```

This is the [source code](https://github.com/marvinlabs/laravel-luhn/blob/master/src/Luhn/Algorithm/LuhnAlgorithm.php) that implements the algorithm.

It was very fascinating for me to learn about this!
