# Enable metrics for your Application

We need prometheus metrics to be exposed our application to be able to monitor them. 
How an application exposes its metrics depends upon how it is built. We will tae the example of a spring boot application and expose it on a url for prometheus to monitor.

Let's again look at our Nordmart example to expose some metrics and then get them through Prometheus.
To expose metrics in a spring boot application we need to add some dependencies:
The first dependency we need is the Spring Boot Actuator. Add the below lines to pom.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```
Actuator is the part of Spring Boot which exposes some APIs, for health-checking and monitoring of your apps.
You can find a working example in nordmart's [pom.xml](https://github.com/stakater-lab/stakater-nordmart-review/blob/85e6a3549ee18abe63b072c23c88f6e8bbfd96bc/pom.xml#L61).

Another dependency that you will need to add is Micrometer.
Micrometer is a set of libraries for Java that allow you to capture metrics and expose them to several different tools – including Prometheus
```xml
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
In the application.properties type in [management.endpoints.web.exposure.include=info, health, prometheus, metrics](https://github.com/stakater-lab/stakater-nordmart-review/blob/85e6a3549ee18abe63b072c23c88f6e8bbfd96bc/src/main/resources/application.properties#L12)

Actuator exposes prometheus metrics on /actuator/prometheus

To learn more about exposing metrics in spring boot you can refer to this [guide](https://docs.spring.io/spring-boot/docs/2.1.2.RELEASE/reference/html/production-ready-endpoints.html).

