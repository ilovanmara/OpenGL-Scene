#version 410 core

in vec3 fNormal;
in vec4 fPosEye;
in vec2 fTexCoords;
in vec4 fragPosLightSpace;
in vec4 lightPosEye;
in vec4 lightPosEye2;
in vec4 lightPosEye3;
in vec4 lightPosEye4;

out vec4 fColor;

uniform	vec3 lightDir;
uniform	vec3 lightColor;

uniform sampler2D diffuseTexture;
uniform sampler2D specularTexture;
uniform sampler2D shadowMap;

vec3 ambient;
float ambientStrength = 0.2f;
vec3 diffuse;
vec3 specular;
float specularStrength = 0.5f;
float shininess = 32.0f;
float shadow;

vec3 lightColor2 = vec3(0.9f, 0.35f, 0.0f);

vec3 ambientPunctiforma;
vec3 diffusePunctiforma;
vec3 specularPunctiforma;

vec3 ambientPunctiforma2;
vec3 diffusePunctiforma2;
vec3 specularPunctiforma2;

vec3 ambientPunctiforma3;
vec3 diffusePunctiforma3;
vec3 specularPunctiforma3;

vec3 ambientPunctiforma4;
vec3 diffusePunctiforma4;
vec3 specularPunctiforma4;

float constant = 1.0f;
float linear = 0.7f;
float quadratic = 1.8f;

void computeLightComponents()
{		
	vec3 cameraPosEye = vec3(0.0f);//in eye coordinates, the viewer is situated at the origin
	
	//transform normal
	vec3 normalEye = normalize(fNormal);	
	
	//compute light direction
	vec3 lightDirN = normalize(lightDir);
	
	//compute view direction 
	vec3 viewDirN = normalize(cameraPosEye - fPosEye.xyz);
		
	//compute ambient light
	ambient = ambientStrength * lightColor;
	
	//compute diffuse light
	diffuse = max(dot(normalEye, lightDirN), 0.0f) * lightColor;
	
	//compute specular light
	vec3 reflection = reflect(-lightDirN, normalEye);
	float specCoeff = pow(max(dot(viewDirN, reflection), 0.0f), shininess);
	specular = specularStrength * specCoeff * lightColor;

	//lumina punctiforma1
	vec3 normalEyePunctiforma =  normalize(fNormal);

	vec3 lightDirNP = normalize(lightPosEye.xyz - fPosEye.xyz);
	
	//light view punctforma
	vec3 viewDirNP = normalize(-fPosEye.xyz);

	//half vect
	vec3 halfVector = normalize(lightDirNP + viewDirNP);

	//distance to light
	float dist = length(lightPosEye.xyz - fPosEye.xyz);

	// attenuation
	float att = 1.0f/(constant + linear * dist + quadratic * (dist * dist));

	//ambient lumina punctiforma
	ambientPunctiforma = att * ambientStrength * lightColor2;

	//diffuse lumina punctiforma
	diffusePunctiforma = att * max(dot(normalEye, lightDirNP), 0.0f) * lightColor2;

	//specular
	float specCoeff2 = pow(max(dot(normalEyePunctiforma, halfVector), 0.0f), shininess);
	specularPunctiforma = att * specularStrength * specCoeff2 * lightColor2;

	//lumina punctiforma2
	vec3 normalEyePunctiforma2 =  normalize(fNormal);

	vec3 lightDirNP2 = normalize(lightPosEye2.xyz - fPosEye.xyz);
	
	//light view punctforma
	vec3 viewDirNP2 = normalize(-fPosEye.xyz);

	//half vect
	vec3 halfVector2 = normalize(lightDirNP2 + viewDirNP2);

	//distance to light
	float dist2 = length(lightPosEye2.xyz - fPosEye.xyz);
	// attenuation
	float att2 = 1.0f/(constant + linear * dist2 + quadratic * (dist2 * dist2));

	//ambient lumina punctiforma
	ambientPunctiforma2 = att2 * ambientStrength * lightColor2;

	//diffuse lumina punctiforma
	diffusePunctiforma2 = att2 * max(dot(normalEye, lightDirNP2), 0.0f) * lightColor2;

	//specular
	float specCoeff3 = pow(max(dot(normalEyePunctiforma2, halfVector2), 0.0f), shininess);
	specularPunctiforma2 = att2 * specularStrength * specCoeff3 * lightColor2;

	//lumina punctiforma3
	vec3 normalEyePunctiforma3 =  normalize(fNormal);

	vec3 lightDirNP3 = normalize(lightPosEye3.xyz - fPosEye.xyz);
	
	//light view punctforma
	vec3 viewDirNP3 = normalize(-fPosEye.xyz);

	//half vect
	vec3 halfVector3 = normalize(lightDirNP3 + viewDirNP2);

	//distance to light
	float dist3 = length(lightPosEye3.xyz - fPosEye.xyz);
	// attenuation
	float att3 = 1.0f/(constant + linear * dist3 + quadratic * (dist3 * dist3));

	//ambient lumina punctiforma
	ambientPunctiforma3 = att3 * ambientStrength * lightColor2;

	//diffuse lumina punctiforma
	diffusePunctiforma3 = att3 * max(dot(normalEye, lightDirNP3), 0.0f) * lightColor2;

	//specular
	float specCoeff4 = pow(max(dot(normalEyePunctiforma3, halfVector3), 0.0f), shininess);
	specularPunctiforma3 = att3 * specularStrength * specCoeff4 * lightColor2;

	//lumina punctiforma4
	vec3 normalEyePunctiforma4 =  normalize(fNormal);

	vec3 lightDirNP4 = normalize(lightPosEye4.xyz - fPosEye.xyz);
	
	//light view punctforma
	vec3 viewDirNP4 = normalize(-fPosEye.xyz);

	//half vect
	vec3 halfVector4 = normalize(lightDirNP4 + viewDirNP4);

	//distance to light
	float dist4 = length(lightPosEye4.xyz - fPosEye.xyz);
	// attenuation
	float att4 = 1.0f/(constant + linear * dist4 + quadratic * (dist4 * dist4));

	//ambient lumina punctiforma
	ambientPunctiforma4 = att4 * ambientStrength * lightColor2;

	//diffuse lumina punctiforma
	diffusePunctiforma4 = att4 * max(dot(normalEye, lightDirNP4), 0.0f) * lightColor2;

	//specular
	float specCoeff5 = pow(max(dot(normalEyePunctiforma3, halfVector4), 0.0f), shininess);
	specularPunctiforma4 = att4 * specularStrength * specCoeff5 * lightColor2;

}

float computeFog()
{
 	float fogDensity = 0.03f;
 	float fragmentDistance = length(fPosEye);
 	float fogFactor = exp(-pow(fragmentDistance * fogDensity, 2));
 
 	return clamp(fogFactor, 0.0f, 1.0f);
}


float computeShadow()
{
	//perform perspective divide
	vec3 normalizedCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
	normalizedCoords = normalizedCoords * 0.5 + 0.5; 

	if (normalizedCoords.z > 1.0f) 
		return 0.0f; 

	float closestDepth = texture(shadowMap, normalizedCoords.xy).r;
	float currentDepth = normalizedCoords.z;

	// Check whether current frag pos is in shadow 
	float bias = 0.005f; 

	float shadow = currentDepth - bias > closestDepth ? 1.0 : 0.0;
	return shadow;
}


void main() 
{
	computeLightComponents();
	
	vec3 baseColor = vec3(0.9f, 0.35f, 0.0f);//orange
	
	ambient *= texture(diffuseTexture, fTexCoords).rgb;
	diffuse *= texture(diffuseTexture, fTexCoords).rgb;
	specular *= texture(specularTexture, fTexCoords).rgb;

	shadow = computeShadow();

	vec3 color = min((ambient + ambientPunctiforma + ambientPunctiforma2 + ambientPunctiforma3 + ambientPunctiforma4 + (1.0f - shadow) * diffuse + diffusePunctiforma + diffusePunctiforma2 + diffusePunctiforma3 + diffusePunctiforma4) + (1.0f - shadow)*(specular + specularPunctiforma + specularPunctiforma2 + specularPunctiforma3 + specularPunctiforma4), 1.0f);
    	
	vec4 color_final = vec4(color, 1.0f);
	float fogFactor = computeFog();
	vec4 fogColor = vec4(0.5f, 0.5f, 0.5f, 1.0f);
	fColor = mix(fogColor, color_final, fogFactor);
	fColor = fogColor * (1 - fogFactor) + color_final * fogFactor;
	//fColor = vec4(color, 1.0f);
}
