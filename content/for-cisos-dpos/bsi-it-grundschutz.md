# BSI IT-Grundschutz Controls

The BSI IT-Grundschutz framework, a German standard for IT security, defines systematic methodologies and controls for safeguarding IT systems. With Stakater App Agility Platform (SAAP) built on Red Hat OpenShift, organizations can effectively implement these controls for Kubernetes-based workloads.

- Total applicable modules in BSI IT-Grundchutz: 2
    - SYS.1.6 - Containerization: 10 Controls
    - APP.4.4 - Kubernetes: 21 Controls
- Total applicable controls in BSI IT-Grundchutz: 31

## Controls Addressed by SAAP

SAAP enables the implementation of all 31 controls defined in the SYS.1.6 and APP.4.4 modules, leveraging Kubernetes configurations, OpenShift’s features, and additional tooling as necessary. Key areas include:

- **Secure Container Images (SYS.1.6)**: Enforcing signed and verified container images via Red Hat Certified Container images and automated vulnerability scanning.
- **Role-Based Access Control (RBAC) (APP.4.4)**: Implementing least privilege access and detailed role management through OpenShift’s integrated RBAC.
- **Logging and Monitoring (APP.4.4)**: Ensuring comprehensive audit logging and monitoring with OpenShift Logging and Prometheus.
- **Resource Quotas and Limits (APP.4.4)**: Managing resource usage through Kubernetes’ Resource Quotas and LimitRanges.
- **Container Runtime Security (SYS.1.6)**: Restricting runtime capabilities using OpenShift’s Security Context Constraints (SCCs).
- **Persistent Data Security (APP.4.4)**: Encrypting data at rest and securing Persistent Volumes (PVs) with Kubernetes RBAC and OpenShift storage features.
- **Network Isolation (SYS.1.6 and APP.4.4)**: Securing inter-service communication using OpenShift NetworkPolicies and Service Mesh.

SAAP enables organizations to meet all **31 controls** across the SYS.1.6 and APP.4.4 modules of the BSI IT-Grundschutz framework. While some controls may require additional tooling or configurations, SAAP provides the foundational capabilities needed for complete compliance.

This comprehensive alignment ensures SAAP remains an indispensable tool for organizations targeting robust security and regulatory adherence.
