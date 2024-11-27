# ISO 27001 Controls

ISO 27001, an international standard for information security, includes 14 domains and 114 controls aimed at protecting information assets. SAAP plays a critical role in enabling compliance with these controls by focusing on the technical aspects of Kubernetes-based workloads.

- Total Domains in ISO 27001: 14
- Total Controls in ISO 27001: 114

## Controls Addressed by SAAP

- **Directly Applicable Controls**: SAAP enables the implementation of 28 controls, fully enforceable through Kubernetes configurations and features. These controls span critical areas such as:

    * **Access Control (A.9)**: Implementing Role-Based Access Control (RBAC) and restricting unauthorized access to resources.
    * **Cryptography (A.10)**: Ensuring data security through encryption and robust key management.
    * **Operations Security (A.12)**: Automating vulnerability scanning, logging, and secure cluster configurations.
    * **Communications Security (A.13)**: Securing inter-service communication with encrypted traffic and network isolation.

- **Partially Applicable Controls**: An additional 22 controls are partially supported by SAAP through integrations and configurable policies. For example:

    * **Information Security Policies (A.5)**: SAAP helps align Kubernetes policies with organizational security frameworks.
    * **Supplier Relationships (A.15)**: Ensures the use of trusted container images and compliance checks for third-party integrations.

SAAP directly or partially addresses approximately 50 controls across ISO 27001’s domains, enabling organizations to align their Kubernetes-based workloads with best practices for security, availability, and compliance. By focusing on technical measures and leveraging Kubernetes features, SAAP simplifies the complex task of meeting international security standards.

This comprehensive support makes SAAP an invaluable tool for organizations aiming to achieve ISO 27001 compliance in modern cloud-native environments.
