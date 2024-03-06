#include "Camera.hpp"

namespace gps {

    //Camera constructor
    Camera::Camera(glm::vec3 cameraPosition, glm::vec3 cameraTarget, glm::vec3 cameraUp) {
        this->cameraPosition = cameraPosition;
        this->cameraTarget = cameraTarget;
 
        this->cameraWorldDirection = cameraUp;
        this->cameraFrontDirection = glm::normalize(this->cameraTarget - this->cameraPosition);
        this->cameraRightDirection = glm::normalize(glm::cross(cameraUp, cameraFrontDirection));
        this->cameraUpDirection = cameraUp;
    }

    //return the view matrix, using the glm::lookAt() function
    glm::mat4 Camera::getViewMatrix() {
        return glm::lookAt(cameraPosition, cameraTarget, cameraUpDirection);
    }

    //update the camera internal parameters following a camera move event
    void Camera::move(MOVE_DIRECTION direction, float speed) {
        glm::vec3 movement;
        switch (direction) {
        case MOVE_FORWARD:
            movement = cameraFrontDirection;
            break;
        case MOVE_LEFT:
            movement = -cameraRightDirection;
            break;
        case MOVE_RIGHT:
            movement = cameraRightDirection;
            break;
        case MOVE_BACKWARD:
            movement = -cameraFrontDirection;
            break;
        }
        cameraPosition += movement * speed;
        cameraTarget += movement * speed;
    }

    //update the camera internal parameters following a camera rotate event
    //yaw - camera rotation around the y axis
    //pitch - camera rotation around the x axis
    void Camera::rotate(float pitch, float yaw) {
        //TODO
        glm::vec3 vect;
        vect.x = cos(glm::radians(pitch)) * cos(glm::radians(yaw));
        vect.y = sin(glm::radians(pitch));
        vect.z = cos(glm::radians(pitch)) * sin(glm::radians(yaw));
        cameraFrontDirection = glm::normalize(vect);
        cameraRightDirection = glm::normalize(glm::cross(cameraFrontDirection, cameraWorldDirection));
        cameraUpDirection = glm::cross(cameraRightDirection, cameraFrontDirection);

        cameraTarget = cameraPosition + cameraFrontDirection;
    }
}
