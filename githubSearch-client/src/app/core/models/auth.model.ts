/**
 * Data Transfer Object (DTO) for user authentication.
 * Represents the payload sent to the backend `/login` endpoint.
 */
export interface LoginRequest {
    userName: string
    password: string
}

/**
 * Represents the successful response from the authentication API.
 * Contains the JSON Web Token (JWT) needed for authorized requests.
 */
export interface LoginResponse {
    token: string
}