plugins {
	id("org.springframework.boot") version "2.7.18" apply false
	id("io.spring.dependency-management") version "1.1.6" apply false
	id("io.freefair.lombok") version "8.10.2" apply false
	id("org.asciidoctor.jvm.convert") version "3.3.2" apply false
}

allprojects {
	group = "com.myapp"
	version = "1.0.0"

	repositories {
		mavenCentral()
	}
}

subprojects {
	apply(plugin = "java")
	apply(plugin = "org.springframework.boot")
	apply(plugin = "io.spring.dependency-management")

	// Java 버전 설정
	configure<JavaPluginExtension> {
		sourceCompatibility = JavaVersion.VERSION_1_8
		targetCompatibility = JavaVersion.VERSION_1_8
	}

	repositories {
		mavenCentral()
	}

	tasks.withType<Test> {
		useJUnitPlatform()
	}
}
