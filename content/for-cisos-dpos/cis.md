# CIS Benchmarks

!!! danger "Disclaimer"

    It is important to note that the information provided in this document is for general informational purposes only. Any liability for the completeness, accuracy, timeliness, or reliability of the content is expressly excluded. Organizations are advised to consult with legal, compliance, or technical experts to ensure that their specific compliance and security needs are adequately addressed.

The CIS Kubernetes Benchmark provides over **120 recommendations** for securing Kubernetes environments, addressing critical areas such as access control, data protection, and cluster configuration. SAAP plays a pivotal role in enabling compliance with these recommendations by leveraging Kubernetes features and advanced security configurations.

- **Total Recommendations in CIS Kubernetes Benchmark**: 120+
- **Key Areas Covered**: Control Plane Security, Worker Node Security, Network Security, Data Protection, and Pod Security.

## Recommendations Addressed by SAAP

- **Fully Applicable Recommendations**: SAAP enables compliance with 70–80 recommendations through Kubernetes-native features and configurations. Key examples include:

    - **Control Plane Security**:
        - Enforcing Role-Based Access Control (RBAC) to restrict unauthorized access.
        - Securing API server communication with TLS encryption.
    - **Node Security**:
        - Disabling anonymous `kubelet` access (`--anonymous-auth=false`).
        - Restricting workload communications with NetworkPolicies.
    - **Data Protection**:
        - Encrypting Secrets in etcd using Kubernetes encryption providers.
    - **Pod Security Standards (PSS)**:
        - Ensuring workloads run with non-root users and minimal privileges.

- **Partially Applicable Recommendations**: SAAP supports an additional 30–40 recommendations through configurable features and organization-specific configurations. For example:

    - **Audit Logging**: SAAP enables centralized logging and monitoring but requires the organization to actively review and act on the logs.
    - **runtime Security**: Provides mechanisms to monitor workloads but relies on organization-defined actions for runtime behavior validation.
    - **Container Image Security**: Enforces trusted container image policies but depends on organizational processes to ensure compliance with image signing and verification standards.

SAAP directly or partially addresses over **100 recommendations** from the CIS Kubernetes Benchmark, making it a comprehensive solution for securing Kubernetes workloads. By focusing on technical enforcement, automation, and integration, SAAP simplifies the path to compliance, reducing the operational burden for organizations.

This robust support makes SAAP an essential platform for adopting and maintaining secure Kubernetes environments, ensuring alignment with CIS best practices while enabling scalability, operational efficiency, and enhanced security.
