# Ingress Monitor Controller

## Problem Statement

There are several uptime monitoring services (statuscake, uptimerobot, pingdom, etc) available which serves the purpose of watching availability of the applications. We would like to take control of automating the configuration process of relevant publically accessible URLs inside the third party monitoring services.

## Solution

Stakater App Agility Platform uses `Ingress Monitor Controller`, an open-source tool to configure different out-of-the-cluster uptime monitor services to check for availability of publically reachable infrastructure and user applications running inside the clusters

## Configuration

IngressMonitorController is already configured for Stakater Agility Platform users. More details can be found on [Ingress Monitor Controller](https://github.com/stakater/IngressMonitorController#-ingress-monitor-controller) or [Add IMC Configuration](./tutorial/add-configuration.md).

## Usage

Information about how to use `EndpointMonitor` CR can be found at [Add Endpoint Monitors](./tutorial/add-monitors.md).
