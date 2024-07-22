# Monitoring System with Grafana and Prometheus

## Objective

This project demonstrates the implementation of a monitoring system using Grafana and Prometheus for a Node.js service. The setup includes Docker and Docker-Compose. All configurations are versioned and uploaded to a GitHub repository.

## Development Steps

### 1. Preliminary Investigation

- Research the main functionalities and features of Grafana and Prometheus.
- Identify how these services can be integrated with the project's programming language.
- Explore similar examples and use cases to understand best practices and potential challenges.

### 2. Installing Docker and Docker-Compose

Install Docker and Docker-Compose in the development environment if they are not already installed.

#### Installation Commands

**For Docker:**

```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io


*For Docker-Compose:*


sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
Verify the correct installation by executing basic Docker and Docker-Compose commands:
docker --version
docker-compose --version


3. Configuration of Prometheus
Create a docker-compose.yml to define the Prometheus service and configure it to collect relevant project metrics.

Prometheus Configuration (prometheus.yml):
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "cadvisor"
    static_configs:
      - targets: ["cadvisor:8080"]

  - job_name: "node_exporter"
    static_configs:
      - targets: ["node_exporter:9100"]

  - job_name: "node_app"
    static_configs:
      - targets: ["node-app:3000"]
Configure Prometheus in Docker Compose:
version: '3'
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus:/etc/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    ports:
      - "9090:9090"
    networks:
      - docker-net
Configuration of Grafana
Add Grafana to the docker-compose.yml as an additional service and configure it to connect to Prometheus as a data source.

Grafana Configuration in Docker Compose:
grafana:
  image: grafana/grafana
  ports:
    - "3001:3000"
  networks:
    - docker-net
5. Integration with the Project
Implement the collection of metrics in the project code using the corresponding programming language. Ensure that the metrics are exposed in a format compatible with Prometheus.

6. Versioning and Repository on GitHub
Initialize a local Git repository for the monitoring project. Add all the files of the chosen project to monitor (the suggested basic one is the Node Todo App.js).

Create a file README.md with detailed instructions for the installation and configuration of the monitoring system.

7. Testing and Verification
Run docker-compose up to start the Prometheus and Grafana services. Verify that Prometheus is collecting metrics and that Grafana is displaying them correctly. Make necessary adjustments based on the evidence to ensure efficient and accurate monitoring.

8. Deliverables
A repository on GitHub with the Docker, Docker-Compose, Prometheus, and Grafana configurations that have been used.
Clear and detailed documentation on the operation of the monitoring system in the README.md file.
Grafana dashboards working, which visualize the project metrics.
Project code with the modifications made to expose the necessary metrics towards the Prometheus service.
Usage
Run Docker Compose
sudo docker network create docker-net
docker-compose up --build
Verify Targets in Prometheus
Navigate to http://localhost:9090/targets and ensure all targets are UP.
Create Dashboards in Grafana
Access Grafana at http://localhost:3001. Create a new dashboard and add panels to visualize metrics, such as http_requests_total.

