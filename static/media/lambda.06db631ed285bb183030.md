---
title: "Lambda Expressions in Java"
uploadDate: "10-10-2024"
---


It's important to understand interfaces firstly, as they are tied to lambda expressions.

## Java Interfaces

If a java interface contains only one abstract method, then it's considered as functional interface. This one method specifies the intentional purpose of the interface. 

Here is an example of it.

```java
import java.lang.FunctionalInterface;
@FunctionalInterface
public interface MyInterface{
    // the single abstract method
    double getValue();
}


```

It's not something compulsory to have @FunctionalInterface annotation, it dictates java compiler to indicate it as functional interface.
Functional interfaces represents abstract concepts like functions, actions or predicates.

Now that we covered Interfaces let's review Lambda Expressions.

## Lambda Expressions

It's essentialy, an anonymous or unnamed method.

Let's say we have a method as below:

```java

double getPiValue() {
    return 3.1415;
}

```

Method can be written with lambda expression.

```java
() -> 3.1415


```

There are 2 types of lambda body:

# 1. A body with a single expression

```java
() -> System.out.println("Lambdas are great");

```

# 2. A body that consist of a block code

```java


() -> {
    double pi = 3.1415;
    return pi;
};


```

The block body allows lambda body to include multiple statements, they are enclosed inside the braces and there has to be semicolons after the braces.

We cannot instantiate an interface but we can declare reference to an interface:

```java

// it will throw an error
MyInterface ref = new myInterface();

// it is valid
MyInterface ref;

ref = () -> 3.1415;

// and then you can call the method

```

# Having a parameter in lambda expression

```java

@FunctionalInterface
interface MyInterface {

    // abstract method
    String reverse(String n);
}

public class Main {

    public static void main( String[] args ) {

        // declare a reference to MyInterface
        // assign a lambda expression to the reference
        MyInterface ref = (str) -> {

            String result = "";
            for (int i = str.length()-1; i >= 0 ; i--)
            result += str.charAt(i);
            return result;
        };

        // call the method of the interface
        System.out.println("Lambda reversed = " + ref.reverse("Lambda"));
    }

}

```

The output will be:

```java
Lambda reversed = adbmaL
```


## Some Examples of Lambda Expressions


Now that we understand the concept, let's check some applications regarding it.


Suppose that members of a social networking application are represented by the following Person class:
```java
public class Person {

    public enum Sex {
        MALE, FEMALE
    }

    String name;
    LocalDate birthday;
    Sex gender;
    String emailAddress;

    public int getAge() {
        // ...
    }

    public void printPerson() {
        // ...
    }
}
```

One simplistic approach is to create several methods; each method searches for members that match one characteristic, such as gender or age. The following method prints members that are older than a specified age:

```java

public static void printPersonsOlderThan(List<Person> roster, int age) {
    for (Person p : roster) {
        if (p.getAge() >= age) {
            p.printPerson();
        }
    }
}

```

We can also add a feature that prints the persons in a specified range of ages.

```java

public static void printPersonsWithinAgeRange(

    List<Person> roster int low, int high){
            for(Person p: roster){
                if(low <= p.getAge() && p.getAge < high){

                    p.printPerson();    
                }

            }

    }
```


another example is that:

```java

    private static int var = 10;
   public static void main(String[] args) {
   ArrayList<Integer> numbers = new ArrayList<Integer>();
   numbers.add(4);
   numbers.add(7);
   numbers.add(6);
   
   numbers.forEach((n) -> {System.out.println(n);});

   // until this point, we add numbers to a list and then using lambda expressions we print them out.
   
   List<Integer> intSeq =  Arrays.asList(1,3,4);
   intSeq.forEach(x -> System.out.println(x + var));  
   
    // here we create a list called intSeq and add numbers with the help of Arrays.asList() method and then print them out.

   List<Integer> list =  Arrays.asList(1,3,4);
   int sum = list.stream().map(x->x*x).reduce((x,y)->x+y).get();
   System.out.println(sum);
   
   }

   // at last, we extend the previous code by adding .reduce(initial, accumulator) to summing up the numbers and the .get() method to return the specified elements.

```

I hope you now have basic understanding of lambda expressions. 

_________________________________________________________________________________________
Resources
_____________________________________________________________________________________

https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html

https://www.geeksforgeeks.org/lambda-expressions-java-8/

https://www.programiz.com/java-programming/lambda-expression