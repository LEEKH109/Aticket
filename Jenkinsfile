pipeline {
	agent any
	
	stages {
		stage('Hello') {
			steps {
				echo "hello world"
			}
		}
		stage('Good') {
			steps {
				echo "good day"
			}
		}
		stage('Finish') {
			steps {
				echo "Finished"
			}
		}
		stage('gitlab clone') {
			steps {
				echo '클론을 시작할게요'
				git branch: 'develop-server', credentialsId: 'wlgjs0458', url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A704.git'
				echo '클론을 완료했어요'
			}
		}
	}
}

