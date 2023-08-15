# Enable metrics for Spring Boot Application

We need Prometheus metrics to be exposed by our application to be able to monitor it.
How an application exposes its metrics depends upon how it is built. We will take the example of a spring boot application and expose its metrics on a Url for Prometheus to monitor.

## Enabling metrics for a Spring Boot Application

Let's again look at our Nordmart example to expose some metrics and then get them through Prometheus.
To expose metrics in a spring boot application, we need to add some dependencies:
The first dependency we need is the Spring Boot Actuator. Add the below lines to pom.xml

```XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```

Actuator is the part of Spring Boot which exposes some APIs, for health-checking and monitoring of your apps.
You can find a working example in Nordmart's [pom.xml](https://github.com/stakater-lab/stakater-nordmart-review/blob/85e6a3549ee18abe63b072c23c88f6e8bbfd96bc/pom.xml#L61).

Another dependency that you will need to add is Micrometer.
Micrometer is a set of libraries for Java that allow you to capture metrics and expose them to several different tools – including Prometheus

```XML

<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-core</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>

```

There is one more thing that you will need to do to get everything working.
In the application.properties type in [management.endpoints.web.exposure.include=info, health, `prometheus`, metrics](https://github.com/stakater-lab/stakater-nordmart-review/blob/85e6a3549ee18abe63b072c23c88f6e8bbfd96bc/src/main/resources/application.properties#L12)

Actuator exposes Prometheus metrics on /actuator/`prometheus`

To learn more about exposing metrics in spring boot you can refer to this [guide](https://docs.spring.io/spring-boot/docs/2.1.2.RELEASE/reference/html/production-ready-endpoints.html).

## Adding Custom Metric to application

A lot of the time you'll be satisfied by the basic metrics you get out of the box with Micrometer. But you might want to add your own custom metrics.

To add a custom metric to our application, we will again be using micrometer.
Micrometer can publish different types of metrics, called primitives. These include gauge, counter and timer.

We have already added a counter to our Nordmart review application. This counter records the number of reviews that have a rating below 3.

Let's take a look at the code from [ReviewServiceImpl.java](https://github.com/stakater-lab/stakater-nordmart-review/blob/9c6f514c9827435a5b0196d0bd185b0778e4cfb8/src/main/java/com/stakater/nordmart/service/ReviewServiceImpl.java)

First we [import the counter and `meterRegistry`](https://github.com/stakater-lab/stakater-nordmart-review/blob/9c6f514c9827435a5b0196d0bd185b0778e4cfb8/src/main/java/com/stakater/nordmart/service/ReviewServiceImpl.java#L5) from micrometer.

```java

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;

```

The ReviewServiceImp class contains a [MeterRegistry and Counter named `ratingCounter`](https://github.com/stakater-lab/stakater-nordmart-review/blob/9c6f514c9827435a5b0196d0bd185b0778e4cfb8/src/main/java/com/stakater/nordmart/service/ReviewServiceImpl.java#L22).

```java

private MeterRegistry meterRegistry;
private Counter ratingCounter;

```

The rating counter is initialized through the following lines of code:

```java

ratingCounter = Counter.builder("nordmart-review.low.ratings")
            .tag("type", "product")
            .description("Total number of ratings below 3 for all product")
            .register(meterRegistry);

```

Every time a rating of below 3 is added, [the rating counter is incremented](https://github.com/stakater-lab/stakater-nordmart-review/blob/9c6f514c9827435a5b0196d0bd185b0778e4cfb8/src/main/java/com/stakater/nordmart/service/ReviewServiceImpl.java#LL94C1-L96C14):

```java

            if (Integer.parseInt(rating) <= 3) {
                `ratingCounter`.increment();
            }
```

This custom metric we just added can be seen through Prometheus. In the following section, we will add an alert using this metric.
