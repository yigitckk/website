---
title: "Understanding Streams in Programming"
uploadDate: "11-10-2024"
---

# Understanding Streams in Programming

The term "stream" is used in a number of similar ways across different programming contexts:

1. **I/O Devices as Streams**: I/O devices can be interpreted as streams, as they produce or consume potentially unlimited data over time.
   
2. **Streams in Object-Oriented Programming**: In object-oriented programming, input streams are generally implemented as iterators.

3. **General Definition**: A stream is an abstraction of a sequence of bytes, like an array, a collection, a generator function, file, or input/output device. Elements are processed one at a time and when needed. It provides a generic view of data. Stream operations can be categorized as intermediate (transforming the stream into another kind of stream, such as `mapToInt()`) and terminal (producing a result like `count()` or `forEach()`). These operations can fundamentally be stated as: reading, writing, and seeking.

## Streams in Java

Here are some examples of how streams are used in Java:

```java
import java.util.ArrayList;
import java.util.Scanner;

public class IntermediateOperations {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> inputs = new ArrayList<>();
        
        while(true){
            String input = scanner.nextLine();
            if(input.equals("")){
                break;
            }
            inputs.add(input);
        }

        inputs.stream().forEach(text -> System.out.println(text)); // printing every input 
    
        Scanner negative = new Scanner(System.in);
        ArrayList<String> numbers = new ArrayList<>();
        
        // second part, lists the numbers in the range of 1 to 5 and stops the program when entered '-'
        while(true){
            String numberStream = negative.nextLine();
            if(numberStream.contains("-")){
                break;
            }
            numbers.add(numberStream);
        }

        numbers.stream()
               .mapToInt(s -> Integer.valueOf(s))
               .filter(s -> s > 0 && s < 6)
               .forEach(s -> System.out.println(s));
    }
}
```

Another example:



```java
public static void main(String[] args) {
    // let's assume that we have a list of books
    // List<Book> books = new ArrayList<>();

    double average;
    average = books.stream()
                   .mapToInt(book -> book.getAuthor().getBirthYear())
                   .average()
                   .getAsDouble();

    System.out.println("Average of the authors' birth years: " + average);

    // the mapping of a book to an author could also be done with a single map call
    average = books.stream()
                   .mapToInt(book -> book.getAuthor().getBirthYear())
                   .average()
                   .getAsDouble();

    System.out.println("Average of the authors' birth years: " + average);
}
```

You can also read files using the 'Files' method in Java:

```java

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

List<Person> presidents = new ArrayList<>();
try {
    // reading the "presidents.txt" file line by line
    Files.lines(Paths.get("presidents.txt"))
         // splitting the row into parts on the ";" character
         .map(row -> row.split(";"))
         // deleting the split rows that have less than two parts 
         .filter(parts -> parts.length >= 2)
         // creating persons from the parts
         .map(parts -> new Person(parts[0], Integer.valueOf(parts[1])))
         // and finally adding the persons to the list
         .forEach(person -> presidents.add(person));
} catch (Exception e) {
    System.out.println("Error: " + e.getMessage());
}

```

## Streams in Java

here is a photo about processing the the bytes.

![Alt text](https://www.tutorialsteacher.com/Content/images/csharp/stream-relations.png)


And here is a C# example:

```csharp

foreach (string filename in Directory.EnumerateFiles(StartDirectory))
{
    using (FileStream SourceStream = File.Open(filename, FileMode.Open))
    {
        using (FileStream DestinationStream = File.Create(EndDirectory + filename.Substring(filename.LastIndexOf('\\'))))
        {
            await SourceStream.CopyToAsync(DestinationStream);
        }
    }
}


```



## More Facts About Streams

## Difference Between Collections and Streams

Collections and streams, while bearing some superficial similarities, have different goals:

-Collections are primarily concerned with the efficient management of and access to their elements.

-Streams, on the other hand, do not provide a means to directly access or manipulate their elements. Instead, they are concerned with declaratively describing their source and the computational operations which will be performed in aggregate on that source.



## Difference Between Collections and Streams

-Streams vs. Collections: Collections provide an architecture to store and manipulate groups of objects. Streams do not perform such operations; they are concerned with declaratively describing their source and computational operations. Streams do not store data, and operations on a stream produce a result without modifying its source.

-Consumable Nature of Streams: Streams are consumable; elements are visited once during a stream's lifetime. To access the same elements again, a new stream must be generated, similar to iterators.

-Stream Operations: Stream operations accept parameters that describe behavior in the program. Lambda expressions or method references can be used, but they shouldn't try to modify the stream's source. In most cases, they should be stateless to avoid conflicts.


______________________________________________________________________________________________



This was a basic introduction and explanation of streams. I'm sure further research and insights will be needed based on your needs. As this is my first blog, I hope you appreciate the effort and overlook any errors in the text.


_______________________________________________________________________________________________


## Resources
https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html

https://en.wikipedia.org/wiki/Stream_(computing)

https://learn.microsoft.com/en-us/dotnet/api/system.io.stream?view=net-8.0#examples