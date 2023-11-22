# Nordmart Review 101

Welcome to the Nordmart Review 101 guide! In this section, we'll explore the architecture of the Nordmart Review, a pivotal sub-module within the Stakater Nordmart fictitious online e-commerce store.

## Architecture

The Nordmart Review is designed with a modular architecture that consists of three crucial components, each playing a unique role in delivering an exceptional user experience:

<div style="text-align:center"><img src="images/nordmart-architecture.png" /></div>

### Review UI

The frontend of the Nordmart Review is built using React, a popular JavaScript library for building user interfaces. This component is responsible for creating an engaging and interactive user interface that customers can use to browse and submit reviews for various products.

### Review API

At the heart of the Nordmart Review is the Review API, a RESTful web service developed using Spring Boot. This component acts as the bridge between the frontend and the MongoDB database, handling incoming requests from the UI, processing them, and fetching or storing data in the database accordingly.

### MongoDB

Serving as the NoSQL database for storing reviews, MongoDB is a powerful and flexible choice for handling unstructured or semi-structured data. It seamlessly stores and manages the reviews submitted by customers, ensuring that the Nordmart Review can efficiently retrieve and display reviews to potential buyers.

## How It Works

Customers visiting the Stakater Nordmart online store can interact with the Nordmart Review to express their opinions about products. Here's how the components collaborate to make this happen:

### Review Submission

When a customer submits a review through the Review UI, the Review API receives the request. The API processes the review details and stores it in the MongoDB database, associating the review with the relevant product.

### Review Retrieval

As customers browse different products, the Review UI sends requests to the Review API to retrieve reviews for specific items. The API communicates with MongoDB to fetch the reviews, which are then displayed to customers on the UI.

### Seamless Interaction

The seamless interaction between the Review UI, Review API, and MongoDB ensures that customers can easily browse, submit, and access reviews. This architecture enables a dynamic and responsive user experience, enhancing customer engagement and decision-making.

The Nordmart Review architecture is designed for scalability, flexibility, and performance, ensuring that as the online store's popularity grows, it can effectively handle a large number of reviews and serve customers without compromising on speed or responsiveness.

For the rest of the tutorials, we'll be using ReviewAPI and MongoDB. Let's continue exploring and enhancing the Nordmart Review together!

```mermaid
graph TD
  subgraph Web_Application
    User_Interface -->|HTTP Requests| REST_API
  end

  subgraph REST_API
    REST_Endpoint -->|CRUD Operations| MongoDB
  end

  subgraph MongoDB
    Data_Collection
  end

```

```mermaid
graph TD
  subgraph Kubernetes_Cluster
    subgraph Web_Deployment
      Web_Pod1
      Web_Pod2
      Web_Pod3
    end

    subgraph REST_API_Deployment
      REST_Pod1
      REST_Pod2
      REST_Pod3
    end

    subgraph MongoDB_Deployment
      MongoDB_Pod1
      MongoDB_Pod2
      MongoDB_Pod3
    end
  end

  Web_Pod1 -->|HTTP Requests| REST_Pod1
  Web_Pod2 -->|HTTP Requests| REST_Pod2
  Web_Pod3 -->|HTTP Requests| REST_Pod3

  REST_Pod1 -->|CRUD Operations| MongoDB_Pod1
  REST_Pod2 -->|CRUD Operations| MongoDB_Pod2
  REST_Pod3 -->|CRUD Operations| MongoDB_Pod3
```

```mermaid
graph TD
  subgraph Kubernetes_Cluster
    style Web_Deployment fill:#86c7f3,stroke:#4f89b6,stroke-width:2px
    Web_Pod(Nordmart Web)

    style REST_API_Deployment fill:#a2e29c,stroke:#5b8c5a,stroke-width:2px
    REST_Pod(Nordmart API)

    style MongoDB_Deployment fill:#d4a5a5,stroke:#936666,stroke-width:2px
    MongoDB_Pod(MongoDB)
  end

  Web_Pod -->|HTTP Requests| REST_Pod
  REST_Pod -->|CRUD Operations| MongoDB_Pod
```

```mermaid
graph TD
  subgraph Kubernetes_Cluster
    style Web_Deployment fill:#86c7f3,stroke:#4f89b6,stroke-width:2px
    Web_Pod(Nordmart Web)

    style REST_API_Deployment fill:#a2e29c,stroke:#5b8c5a,stroke-width:2px
    REST_Pod(Nordmart API)

    style MongoDB_Deployment fill:#d4a5a5,stroke:#936666,stroke-width:2px
    MongoDB_Pod(MongoDB)
    
    Web_Pod -->|HTTP Requests| REST_Pod
    REST_Pod -->|CRUD Operations| MongoDB_Pod
  end
```

```mermaid
graph TD
  subgraph Kubernetes_Cluster
    style Web_Namespace fill:#cccccc,stroke:#999999,stroke-width:2px
    subgraph Web_Namespace
      style Web_Deployment fill:#86c7f3,stroke:#4f89b6,stroke-width:2px
      Web_Pod(Nordmart Web)
    end

    style REST_API_Namespace fill:#cccccc,stroke:#999999,stroke-width:2px
    subgraph REST_API_Namespace
      style REST_API_Deployment fill:#a2e29c,stroke:#5b8c5a,stroke-width:2px
      REST_Pod(Nordmart API)
    end

    style MongoDB_Namespace fill:#cccccc,stroke:#999999,stroke-width:2px
    subgraph MongoDB_Namespace
      style MongoDB_Deployment fill:#d4a5a5,stroke:#936666,stroke-width:2px
      MongoDB_Pod(MongoDB)
    end

    Web_Pod -->|HTTP Requests| REST_Pod
    REST_Pod -->|CRUD Operations| MongoDB_Pod
  end
```

```mermaid
graph TD
  subgraph Kubernetes_Cluster
    style Namespace fill:#cccccc,stroke:#999999,stroke-width:2px
    subgraph Namespace
      style Web_Deployment fill:#86c7f3,stroke:#4f89b6,stroke-width:2px
      Web_Pod(Nordmart Web)

      style REST_API_Deployment fill:#a2e29c,stroke:#5b8c5a,stroke-width:2px
      REST_Pod(Nordmart API)

      style MongoDB_Deployment fill:#d4a5a5,stroke:#936666,stroke-width:2px
      MongoDB_Pod(MongoDB)
    end

    Web_Pod -->|HTTP Requests| REST_Pod
    REST_Pod -->|CRUD Operations| MongoDB_Pod
  end

```

```mermaid
flowchart TB
  subgraph Kubernetes Cluster
    style Namespace fill:#cccccc,stroke:#999999,stroke-width:2px
    subgraph Namespace
      style Web_Deployment fill:#86c7f3,stroke:#4f89b6,stroke-width:2px
      Web_Pod(Nordmart Web)

      style REST_API_Deployment fill:#a2e29c,stroke:#5b8c5a,stroke-width:2px
      REST_Pod(Nordmart API)

      style MongoDB_Deployment fill:#d4a5a5,stroke:#936666,stroke-width:2px
      MongoDB_Pod(MongoDB)
    end

    Web_Pod -->|HTTP Requests| REST_Pod
    REST_Pod -->|CRUD Operations| MongoDB_Pod
  end
```

```mermaid
flowchart TB
  subgraph Kubernetes_Cluster
    style Namespace fill:#cccccc,stroke:#999999,stroke-width:2px
    subgraph Namespace
      style Web_Deployment fill:#86c7f3,stroke:#4f89b6,stroke-width:2px
      Web_Pod(Nordmart Web)

      style REST_API_Deployment fill:#a2e29c,stroke:#5b8c5a,stroke-width:2px
      REST_Pod(Nordmart API)

      style MongoDB_Deployment fill:#d4a5a5,stroke:#936666,stroke-width:2px
      MongoDB_Pod(MongoDB)
    end

    Web_Pod -->|HTTP Requests| REST_Pod
    REST_Pod -->|CRUD Operations| MongoDB_Pod
  end

  subgraph Ingress_Controller
    Ingress
  end

  External_User-->|HTTP Requests|Ingress
  Ingress-->|Routes|Web_Pod

```

```mermaid
flowchart TB
  subgraph Kubernetes_Cluster
    style Namespace fill:#cccccc,stroke:#999999,stroke-width:2px
    subgraph Namespace
      style Web_Deployment fill:#86c7f3,stroke:#4f89b6,stroke-width:2px
      Web_Pod(Nordmart Web)

      style REST_API_Deployment fill:#a2e29c,stroke:#5b8c5a,stroke-width:2px
      REST_Pod(Nordmart API)

      style MongoDB_Deployment fill:#d4a5a5,stroke:#936666,stroke-width:2px
      MongoDB_Pod(MongoDB)
    end

    Web_Pod -->|HTTP Requests| REST_Pod
    REST_Pod -->|CRUD Operations| MongoDB_Pod
  end

  subgraph Istio
    style sidecar fill:#ffb366,stroke:#ff8000,stroke-width:2px
    Web_Pod -->|Istio Sidecar| Web_Sidecar
    REST_Pod -->|Istio Sidecar| REST_Sidecar
    MongoDB_Pod -->|Istio Sidecar| MongoDB_Sidecar
  end

```

```mermaid
flowchart TB
  subgraph Kubernetes_Cluster
    style Namespace fill:#cccccc,stroke:#999999,stroke-width:2px
    subgraph Namespace
      style Web_Deployment fill:#86c7f3,stroke:#4f89b6,stroke-width:2px
      Web_Pod(Nordmart Web)
        Web_Container(Nordmart Web Container)

      style REST_API_Deployment fill:#a2e29c,stroke:#5b8c5a,stroke-width:2px
      REST_Pod(Nordmart API)
        REST_Container(Nordmart API Container)

      style MongoDB_Deployment fill:#d4a5a5,stroke:#936666,stroke-width:2px
      MongoDB_Pod(MongoDB)
        MongoDB_Container(MongoDB Container)
    end

    Web_Pod -->|HTTP Requests| REST_Pod
    REST_Pod -->|CRUD Operations| MongoDB_Pod
  end

  subgraph Istio
    style sidecar fill:#ffb366,stroke:#ff8000,stroke-width:2px
    Web_Pod -->|Istio Sidecar| Web_Container
    REST_Pod -->|Istio Sidecar| REST_Container
    MongoDB_Pod -->|Istio Sidecar| MongoDB_Container
  end
```

```mermaid
graph TD
  subgraph Pod
    Application_Container(Application)
    Sidecar_Container(Sidecar)
  end
```

```mermaid
graph TD
  subgraph Pod
    Application_Container(Application)
    Sidecar_Container(Sidecar)
  end

  Application_Container -->|Egress Traffic| Sidecar_Container
  Sidecar_Container -->|Ingress Traffic| Application_Container

```

```mermaid
graph TD
  subgraph Web_Pod
    Web_Application(Web Application)
    Istio_Web_Sidecar(Istio Sidecar)
  end

  subgraph API_Pod
    API_Application(API Application)
    Istio_API_Sidecar(Istio Sidecar)
  end

  subgraph MongoDB_Pod
    MongoDB_Application(MongoDB Application)
    Istio_MongoDB_Sidecar(Istio Sidecar)
  end

  Web_Application -->|Outgoing Traffic| Istio_Web_Sidecar
  Istio_Web_Sidecar -->|Outgoing Traffic| API_Application

  API_Application -->|Outgoing Traffic| Istio_API_Sidecar
  Istio_API_Sidecar -->|Outgoing Traffic| Istio_MongoDB_Sidecar

  Istio_MongoDB_Sidecar -->|Incoming Traffic| MongoDB_Application
  Istio_API_Sidecar -->|Incoming Traffic| Web_Application
  Istio_Web_Sidecar -->|Incoming Traffic| API_Application
```

```mermaid
graph LR;
 client([client])-. Ingress-managed <br> load balancer .->ingress[Ingress];
 ingress-->|routing rule|service[Service];
 subgraph cluster
 ingress;
 service-->pod1[Pod];
 service-->pod2[Pod];
 end
 classDef plain fill:#ddd,stroke:#fff,stroke-width:4px,color:#000;
 classDef k8s fill:#326ce5,stroke:#fff,stroke-width:4px,color:#fff;
 classDef cluster fill:#fff,stroke:#bbb,stroke-width:2px,color:#326ce5;
 class ingress,service,pod1,pod2 k8s;
 class client plain;
 class cluster cluster;
```

```mermaid

```

```mermaid

```

