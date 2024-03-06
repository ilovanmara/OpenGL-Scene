#version 410 core

layout(location=0) in vec3 vPosition;
layout(location=1) in vec3 vNormal;
layout(location=2) in vec2 vTexCoords;

out vec3 fNormal;
out vec4 fPosEye;
out vec2 fTexCoords;
out vec4 fragPosLightSpace;
out vec4 lightPosEye;
out vec4 lightPosEye2;
out vec4 lightPosEye3;
out vec4 lightPosEye4;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 lightSpaceTrMatrix;
uniform	mat3 normalMatrix;
uniform vec3 lightPos;
uniform vec3 lightPos2;
uniform vec3 lightPos3;
uniform vec3 lightPos4;

void main() 
{
	//compute eye space coordinates
	fPosEye = view * model * vec4(vPosition, 1.0f);
	fNormal = normalize(normalMatrix * vNormal);
	fTexCoords = vTexCoords;
	gl_Position = projection * view * model * vec4(vPosition, 1.0f);
	fragPosLightSpace = lightSpaceTrMatrix * model * vec4(vPosition, 1.0f);
	lightPosEye = view*model*vec4(lightPos,1.0f);
	lightPosEye2 = view*model*vec4(lightPos2,1.0f);
	lightPosEye3 = view*model*vec4(lightPos3,1.0f);
	lightPosEye4 = view*model*vec4(lightPos4,1.0f);
}
