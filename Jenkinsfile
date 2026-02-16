pipeline {
    agent any

    parameters {
        choice(choices: 'azure\ngoog', description: 'Data Center', name: 'DATACENTER')
        string(defaultValue: '', description: 'Cluster name', name: 'CLUSTER')        
    }

    stages {
        stage('Docker Build') {
            steps {
                // This builds your image
                sh "docker build -t health-app:latest ."
            }
        }

        stage('Docker Deploy') {
            steps {
                // 1. Remove the old container if it exists
                sh "docker rm -f my-running-health-app || true"
                
                // 2. Run the new container on port 3000
                // We use health-app:latest which was built in the previous stage
                sh "docker run -d --name my-running-health-app -p 5000:5000 health-app:latest"
                
                echo "Success! Your app is running on port 5000."
            }
        }
    }
}
